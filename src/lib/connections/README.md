# Connections

A connection represents a table entity

Since we are using `graphql-relay`, we need a re-evaluate our Entity so as to contain the `Edge` and `Node` which is needed by relay

The naming convention of our connection will be `<EntityName>Connection` e.g. `UserConnection`

## Creating a new connection

In order to create a new connection, we extend the `Connection` from `'src/lib/connections'`.
See below on how to create a new connection

```ts
import { Connection } from 'src/lib/connections';
import { User } from 'src/lib/entities';

@ObjectType()
export class UserConnection extends Connection<User>(User) {}
```
