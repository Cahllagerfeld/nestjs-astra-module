import { ModuleMetadata, Type } from '@nestjs/common';
import { AstraConfig } from './astra-config.interface';
import { DatastaxOptionsFactory } from './connectionfactory.interface';
export interface AsyncAstraConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory?: (...args: any[]) => Promise<AstraConfig> | AstraConfig;
  useClass?: Type<DatastaxOptionsFactory>;
  useExisting?: Type<DatastaxOptionsFactory>;
}
