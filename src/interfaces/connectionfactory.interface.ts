import { AstraDatastaxConfig } from "./astra-config-datastax.interface";
import { AstraLocalConfig } from "./astra-config-local.interface";

export interface DatastaxOptionsFactory {
  createDatastaxOptions():
    | Promise<AstraDatastaxConfig>
    | AstraDatastaxConfig
    | AstraLocalConfig
    | Promise<AstraLocalConfig>;
}
