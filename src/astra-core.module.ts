import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { AstraConfig } from './interfaces/astra-config.interface';
import { StargateConfig } from './interfaces/stargate-config.interface';
// @ts-ignore
import { createClient } from '@astrajs/collections';
import { CLIENT_OPTIONS, DATASTAX_CLIENT } from './constants';
import { AsyncAstraConfig } from './interfaces/astra-async-config.interface';
import { AsyncStargateConfig } from './interfaces/stargate-async-config.interface';
import { DatastaxOptionsFactory } from './interfaces/connectionfactory.interface';

const connectionFactory = (options: StargateConfig | AstraConfig) => {
  return {
    provide: DATASTAX_CLIENT,
    useFactory: async () => {
      return await createClient(options);
    },
  };
};
@Global()
@Module({})
export class AstraCoreModule {
  static forRoot(options: StargateConfig | AstraConfig): DynamicModule {
    const providers = [connectionFactory(options)];
    return {
      module: AstraCoreModule,
      providers: providers,
      exports: providers,
    };
  }

  static forRootAsync(
    options: AsyncAstraConfig | AsyncStargateConfig,
  ): DynamicModule {
    const provider: Provider = {
      inject: [CLIENT_OPTIONS],
      provide: DATASTAX_CLIENT,
      useFactory: async (options: AsyncAstraConfig | AsyncStargateConfig) =>
        await createClient(options),
    };
    return {
      module: AstraCoreModule,
      providers: [...this.createAsyncProviders(options), provider],
      exports: [provider],
    };
  }

  private static createAsyncProviders(
    options: AsyncAstraConfig | AsyncStargateConfig,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<DatastaxOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AsyncAstraConfig | AsyncStargateConfig,
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: CLIENT_OPTIONS,
        useFactory: options.useFactory,
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<DatastaxOptionsFactory>,
    ];
    return {
      provide: CLIENT_OPTIONS,
      useFactory: async (optionsFactory: DatastaxOptionsFactory) =>
        await optionsFactory.createDatastaxOptions(),
      inject,
    };
  }
}
