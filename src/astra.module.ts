import { DynamicModule, Module } from "@nestjs/common";
import { AstraService } from "./astra.service";
import { CONFIG_OPTIONS } from "./constants";
import { AstraModuleConfig } from "./interfaces/astra-modue-config.interface";

@Module({})
export class AstraModule {
  static forFeature(options: AstraModuleConfig): DynamicModule {
    return {
      module: AstraModule,
      providers: [{ provide: CONFIG_OPTIONS, useValue: options }, AstraService],
      exports: [AstraService],
    };
  }
}
