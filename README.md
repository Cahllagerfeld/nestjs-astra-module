# nestjs-astra-module

## Description

Nest.js-Astra Module for Eddiehub-Project. It uses [@astrajs/collections](https://github.com/datastax/astrajs/tree/master/packages/collections) to connect to Datastax Astra, or a local Stargate container.

## Rules

Commits follow the standard [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Setup

```bash
$ npm install
```

## Usage

The module is imported twice:

1. The Core-Module sets up the connection to DataStax Astra / LocalStargate using `forRoot` or `forRootAsync`- Function
1. The `forFeature`-Function sets collection and namespace in the specific module where the database should be used

### Initialization Core

The Core-Module can be initialized synchronous and asynchronous using `forRoot` or `forRootAsync`.
This part of the module sets up the actual connection to the service. That's why it only needs to be configured once - Preferable in the `app.module`.
Depending on the use-case (connection to `local stargate` or `astra`), different configurations need to be passed in.

Some example implementations can be found in the [docs folder](/docs)

### Feature-Modules

By developing different module within your `nest`-Application you need to store different data in different collections.
The `forFeature`-function enables you to do this. It can be imported to specific feature-modules, but relies on the Core-Module.

### Usage in Feature-Module

The following snippet shows how the `forFeature`-function is implemented. In this case the initialization between `local stargate` and `astra` dont differ.

```ts
/*users.module.ts*/

import { Module } from '@nestjs/common';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';
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

## Astra Service

The Astra-Service is a service, which can be ejected like every other service.
The Service provides the actual functions for performing actions with `local stargate` or `Astra`
The Services is observable-based.

```ts
//user.service.ts

import { AstraService, documentId } from '@cahllagerfeld/nestjs-astra';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { user } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly astra: AstraService) {}
  addUser(data: user): Observable<documentId> {
    return this.astra.create<user>(data);
  }
}
```

## License

[MIT licensed](LICENSE).
