import { ModuleMetadata, Type } from '@nestjs/common';
import { AstraLocalConfig } from './astra-config-local.interface';
import { DatastaxOptionsFactory } from './connectionfactory.interface';
export interface AsyncAstraLocalConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory?: (...args: any[]) => Promise<AstraLocalConfig> | AstraLocalConfig;
  useClass?: Type<DatastaxOptionsFactory>;
  useExisting?: Type<DatastaxOptionsFactory>;
}
