import { ModuleMetadata, Type } from '@nestjs/common';
import { StargateConfig } from './stargate-config.interface';
import { DatastaxOptionsFactory } from './connectionfactory.interface';
export interface AsyncStargateConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory?: (...args: any[]) => Promise<StargateConfig> | StargateConfig;
  useClass?: Type<DatastaxOptionsFactory>;
  useExisting?: Type<DatastaxOptionsFactory>;
}
