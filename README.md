<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This folder is discover bookings applications api. It will be based on the MVC model

## Technologies

- Nestjs & @nestjs/typeorm
- Graphql-relay
- Typeorm & @nestjs/typeorm
- Graphql

## Architecture

MVC architecture where each folder will be named as per the table e.g.
user

- user.resolver.ts - contains graphql queries and mutations for said table e.g. user
- user.service.ts - Contains all the functionalities that will interact with the reposiory folder
- user.module.ts - Our core folder which will be injected to our root app module

The general `lib` folder will contain all other functionalities
e.g.
It will contain

- repository - This is the folder that will interact with our DB
- entities - This folder will contain our DB tables, we will use the old tables from `db` folder
- migrations - The DB migrations will be created here
- graphql - The graphql schema
- connections - the relay connections
- types - Custom types that are reusable
- utils - Any shared utils

naming conventions will be `<modulename>.<foldername>.ts`

### TDD

This backend system will be based on TDD (Test Driven Development) appraoch and its therefore required to write tests for different api's and ensure all tests are passing before being merged
Tests should be written in the `test` folder while other codes are written in the `src` folder

## Migration

The configuration for migrations is made in the `src/config/datasource.config.ts`

Due to the new typeorm features follow below steps to run migrations

### Running Migrations

- Open the `src/config/datasource.config.ts`
- Update the value of `synchronize` to `true` (This will automatically run current migrations)
- Afterwards turn this value back to `false`

### Generating a migration

- First ensure that the value `synchronize` in `src/config/datasource.config.ts` is `false`
- Create a new entity table in `src/lib/entities`
- Run `yarn migration:generate <migrations directory/migration-name>` e.g. `yarn migration:generate src/lib/migrations/create-user-entity`

**NB: To run the above migration follow the previous step on Running migrations**

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
