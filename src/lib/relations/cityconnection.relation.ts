import { Field, ObjectType } from '@nestjs/graphql';

import { City } from 'src/lib/entities';

@ObjectType()
class CityConnectionEdge {
  @Field(() => City)
  node: City;
}

@ObjectType()
export class CityConnectionRelation {
  @Field(() => [CityConnectionEdge], { defaultValue: [] })
  edges: CityConnectionEdge[];
}
