import { DynamicModule, Module } from '@nestjs/common';
import { AstraCoreModule } from './astra-core.module';
import { AstraService } from './astra.service';
import { CLIENT_OPTIONS } from './constants';
import { AsyncAstraDatastaxConfig } from './interfaces/astra-async-config-datastax.interface';
import { AsyncAstraLocalConfig } from './interfaces/astra-async-config-local.interface';
import { AstraClientConfig } from './interfaces/astra-client-config.interface';
import { AstraDatastaxConfig } from './interfaces/astra-config-datastax.interface';
import { AstraLocalConfig } from './interfaces/astra-config-local.interface';

@Module({})
export class AstraModule {
  static forRoot(
    options: AstraLocalConfig | AstraDatastaxConfig,
  ): DynamicModule {
    return {
      module: AstraModule,
      imports: [AstraCoreModule.forRoot(options)],
    };
  }
  static forFeature(options: AstraClientConfig): DynamicModule {
    return {
      module: AstraModule,
      providers: [{ provide: CLIENT_OPTIONS, useValue: options }, AstraService],
      exports: [AstraService],
    };
  }

  static forRootAsync(
    options: AsyncAstraDatastaxConfig | AsyncAstraLocalConfig,
  ): DynamicModule {
    return {
      module: AstraModule,
      imports: [AstraModule.forRootAsync(options)],
    };
  }
}
