# Stargate Initialization

The following code-samples show how to use the module to connect it to Astra, a Datastax managed DAAS.

## Example asynchronous initialization

```ts
//app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { AstraConfigService } from './astra-config.service';

@Module({
  imports: [
    AstraModule.forRootAsync({
      useClass: AstraConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AstraConfigService],
})
export class AppModule {}
```

```ts
//astra-config.service.ts
import { Injectable } from '@nestjs/common';
import {
  AstraDatastaxConfig,
  AstraLocalConfig,
  DatastaxOptionsFactory,
} from '@cahllagerfeld/nestjs-astra';

@Injectable()
export class AstraConfigService implements DatastaxOptionsFactory {
  createDatastaxOptions(): AstraLocalConfig | AstraDatastaxConfig {
    return {
      astraDatabaseId: '<Your-Database-ID>',
      applicationToken: '<Your-Application-Token>',
      astraDatabaseRegion: '<Your-Database-Region>',
    };
  }
}
```

## Example synchronous initialization

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';

@Module({
  imports: [
    AstraModule.forRoot({
      astraDatabaseId: '<Your-Database-ID>',
      applicationToken: '<Your-Application-Token>',
      astraDatabaseRegion: '<Your-Database-Region>',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
