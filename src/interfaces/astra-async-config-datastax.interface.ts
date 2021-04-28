import { ModuleMetadata, Type } from '@nestjs/common';
import { AstraDatastaxConfig } from './astra-config-datastax.interface';
import { DatastaxOptionsFactory } from './connectionfactory.interface';
export interface AsyncAstraDatastaxConfig
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory?: (
    ...args: any[]
  ) => Promise<AstraDatastaxConfig> | AstraDatastaxConfig;
  useClass?: Type<DatastaxOptionsFactory>;
  useExisting?: Type<DatastaxOptionsFactory>;
}
