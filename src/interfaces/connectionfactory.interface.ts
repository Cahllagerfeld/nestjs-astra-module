import { AstraConfig } from './astra-config.interface';
import { StargateConfig } from './stargate-config.interface';

export interface DatastaxOptionsFactory {
  createDatastaxOptions():
    | Promise<AstraConfig>
    | AstraConfig
    | StargateConfig
    | Promise<StargateConfig>;
}
