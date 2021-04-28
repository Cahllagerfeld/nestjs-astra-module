import { DynamicModule, Global, Module } from '@nestjs/common';
import { AstraDatastaxConfig } from './interfaces/astra-config-datastax.interface';
import { AstraLocalConfig } from './interfaces/astra-config-local.interface';
// @ts-ignore
import { createClient } from '@astrajs/collections';
import { DATASTAX_CLIENT } from './constants';

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
    options: AstraLocalConfig | AstraDatastaxConfig,
  ): DynamicModule {
    const providers = [connectionFactory(options)];
    return {
      module: AstraCoreModule,
      providers: providers,
      exports: providers,
    };
  }
}
