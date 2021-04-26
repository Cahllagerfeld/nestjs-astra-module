import { Module } from '@nestjs/common';
import { AstraService } from './astra.service';

@Module({
  providers: [AstraService]
})
export class AstraModule {}
