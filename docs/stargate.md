# Stargate Initialization

The following code-samples show how to use the module to connect it to a local stargate container.

## Example asynchronous initialization

```ts
/*app.module.ts*/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { createDatastaxOptions } from './astraConfig.service';

@Module({
  imports: [
    AstraModule.forRootAsync({
      useClass: createDatastaxOptions,
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Config is set in `astraConfig.service.ts`

```ts
/*astraConfig.service.ts*/

import { Injectable } from '@nestjs/common';
import {
  AstraDatastaxConfig,
  AstraLocalConfig,
  DatastaxOptionsFactory,
} from '@cahllagerfeld/nestjs-astra';

@Injectable()
export class createDatastaxOptions implements DatastaxOptionsFactory {
  createDatastaxOptions(): AstraLocalConfig | AstraDatastaxConfig {
    return {
      authToken: '<Your-Super-Secret-Token>',
      baseApiPath: '/v2/namespaces',
      baseUrl: 'http://localhost:8082',
    };
  }
}
```

## Example synchronous initialization

```ts
/*app.module.ts*/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';

@Module({
  imports: [
    AstraModule.forRoot({
      authToken: '<Your-Super-Secret-Token>',
      baseApiPath: '/v2/namespaces',
      baseUrl: 'http://localhost:8082',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
