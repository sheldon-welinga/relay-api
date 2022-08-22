# Modules

A module is a class annotated with a `@Module()` decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.

This contains the main layer of a module

_All new modules created should be added in the `init.module.ts` file and will be automatically captured in our codebase_

## Creating a new Module

Any new module created must be annotated with `@Module` and the naming convention of the class will be `<ModuleName>.module.ts` where `ModuleName` represents the name of the module in `lowercase`. It should match the name of the `entity` created

The module should import the `TypeOrmModule.forFeature([<Entity>])` where the `<Entity>` is the name of the entity in the `entities` directory.

It should also provide the `<Entity>Repository`, `<Entity>Service` and `<Entity>Resolver` by default

Check below on creating a module

```ts
// country.module.ts

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountryRespository, CountryService, CountryResolver],
})
export class CountryModule {}
```

**NB: Any created module should be export in the `index.ts` file**
