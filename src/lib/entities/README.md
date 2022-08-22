# Entities

This represents our database tables

## Creating a new Entity

In order to create a new entity you must `extend` the `BaseEntity` by default which is exported from `'src/lib/entities`
The file name naming convention should be the exact table name without adding `Entity` keyword at the end

_NB: All new entities created must be exported in the `index.ts` file. Incase of any errors check how you import the entities and their entity dependents_

Since we are using Graphql, we should define the `ObjectType()` decorator before the entity class as well as `Entity()` to let our database recognize it as a table

Refer to the documentations from [Typeorm Entities](https://typeorm.io/entities#what-is-entity) and [Nestjs Graphql](https://docs.nestjs.com/graphql/resolvers#object-types)

See example below on creating a new Entity table

```ts
import { BaseEntity } from 'src/lib/entities';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Column()
  @Field()
  name: string;
}
```
