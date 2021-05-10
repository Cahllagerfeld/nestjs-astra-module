import { DynamicModule, Module } from '@nestjs/common';
import { AstraCoreModule } from './astra-core.module';
import { AstraService } from './astra.service';
import { CLIENT_OPTIONS } from './constants';
import { AsyncAstraConfig } from './interfaces/astra-async-config.interface';
import { AsyncStargateConfig } from './interfaces/stargate-async-config.interface';
import { AstraClientConfig } from './interfaces/astra-client-config.interface';
import { AstraConfig } from './interfaces/astra-config.interface';
import { StargateConfig } from './interfaces/stargate-config.interface';

@Module({})
export class AstraModule {
  static forRoot(options: StargateConfig | AstraConfig): DynamicModule {
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
    options: AsyncAstraConfig | AsyncStargateConfig,
  ): DynamicModule {
    return {
      module: AstraModule,
      imports: [AstraCoreModule.forRootAsync(options)],
    };
  }
}
