# nestjs-astra-module

## Description

Nest.js-Astra Module for Eddiehub-Project. It uses [@astrajs/collections](https://github.com/datastax/astrajs/tree/master/packages/collections) to connect to Datastax Astra, or a local Stargate container.

## Rules

Commits follow the standard [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Setup

```bash
$ npm install
```

For testing it with a local project use

```bash
# sets up link
$ npm link

#connects package to a local npm-project
$ npm link nestjs-astra
```

## Usage

The module is imported twice:

1. The Core-Module sets up the connection to DataStax Astra / LocalStargate using `forRoot` or `forRootAsync`- Function
1. The `forFeature`-Function sets collection and namespace in the specific module where the database should be used

### Initialization Core-Module

The Core-Module can be initialized synchronous and asynchronous using `forRoot` or `forRootAsync`

Example asynchronous initialization

```ts
/*app.module.ts*/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstraModule } from 'nestjs-astra';
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
} from 'nestjs-astra';

@Injectable()
export class createDatastaxOptions implements DatastaxOptionsFactory {
  createDatastaxOptions(): AstraLocalConfig | AstraDatastaxConfig {
    return {
      authToken: '<Your-Super-Secret-Token>',
      baseApiPath: 'v2/namespaces',
      baseUrl: 'http://localhost:8082',
    };
  }
}
```

Example synchronous initialization

```ts
/*app.module.ts*/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstraModule } from 'nestjs-astra';

@Module({
  imports: [
    AstraModule.forRoot({
      authToken: '<Your-Super-Secret-Token>',
      baseApiPath: 'v2/namespaces',
      baseUrl: 'http://localhost:8082',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Usage in Feature-Module

```ts
/*users.module.ts*/

import { Module } from '@nestjs/common';
import { AstraModule } from 'nestjs-astra';
import { usersController } from './users.controller';
import { usersService } from './users.service';

@Module({
  imports: [
    AstraModule.forFeature({ collection: 'users', namespace: 'Eddiehub' }),
  ],
  controllers: [usersController],
  providers: [usersService],
})
export class usersModule {}
```

## License

[MIT licensed](LICENSE).
