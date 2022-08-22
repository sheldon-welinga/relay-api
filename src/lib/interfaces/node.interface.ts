import { InterfaceType, Field, ID } from '@nestjs/graphql';

import { GlobalDescription } from 'src/lib/descriptions';

@InterfaceType()
export abstract class Node {
  @Field(() => ID, { description: GlobalDescription.GLOBAL_UNIQUE_ID })
  id: string;
}
