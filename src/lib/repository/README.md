# Repository

Repository is the EntityManager which we use to interact with our database. It contains several operations such as `insert`, `find`, `findOne` e.t.c which we use for both fetching data, inserting data, updating data and deleting data in our database.

Any repository created should Extend the `EntityRepository` which already all logic for our application Database interaction

## Creating a new Repository

import the `EntityRepository` from `'src/lib/repository'` and extend it

The `EntityRepository` accepts a type which is the `Entity` created in our `'src/lib/entities'` folder/directory.
The entity represents our database table

See example below on creating a new repository:-

```ts
import { EntityRepository } from 'src/lib/repository';

@Injectable()
export class UserRepository extends EntityRepository<User> {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
``;
```
