import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";
import { AstraDatastaxConfig } from "./interfaces/astra-config-datastax.interface";
import { AstraLocalConfig } from "./interfaces/astra-config-local.interface";
// @ts-ignore
import { createClient } from "@astrajs/collections";
import { CLIENT_OPTIONS, DATASTAX_CLIENT } from "./constants";
import { AsyncAstraDatastaxConfig } from "./interfaces/astra-async-config-datastax.interface";
import { AsyncAstraLocalConfig } from "./interfaces/astra-async-config-local.interface";
import { DatastaxOptionsFactory } from "./interfaces/connectionfactory.interface";

const connectionFactory = (options: AstraLocalConfig | AstraDatastaxConfig) => {
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
  static forRoot(
    options: AstraLocalConfig | AstraDatastaxConfig
  ): DynamicModule {
    const providers = [connectionFactory(options)];
    return {
      module: AstraCoreModule,
      providers: providers,
      exports: providers,
    };
  }

  static forRootAsync(
    options: AsyncAstraDatastaxConfig | AsyncAstraLocalConfig
  ): DynamicModule {
    const provider: Provider = {
      inject: [CLIENT_OPTIONS],
      provide: DATASTAX_CLIENT,
      useFactory: async (
        options: AsyncAstraDatastaxConfig | AsyncAstraLocalConfig
      ) => await createClient(options),
    };
    return {
      module: AstraCoreModule,
      providers: [...this.createAsyncProviders(options), provider],
      exports: [provider],
    };
  }

  private static createAsyncProviders(
    options: AsyncAstraDatastaxConfig | AsyncAstraLocalConfig
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
    options: AsyncAstraDatastaxConfig | AsyncAstraLocalConfig
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
