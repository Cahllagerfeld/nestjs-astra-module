import { DynamicModule, Module } from "@nestjs/common";
import { AstraCoreModule } from "./astra-core.module";
import { AstraService } from "./astra.service";
import { AstraDatastaxConfig } from "./interfaces/astra-config-datastax.interface";
import { AstraLocalConfig } from "./interfaces/astra-config-local.interface";

@Module({})
export class AstraModule {
  static forRoot(
    options: AstraLocalConfig | AstraDatastaxConfig
  ): DynamicModule {
    return {
      module: AstraModule,
      imports: [AstraCoreModule.forRoot(options)],
    };
  }
  static forFeature(): DynamicModule {
    return {
      module: AstraModule,
      providers: [],
      exports: [AstraService],
    };
  }
}
