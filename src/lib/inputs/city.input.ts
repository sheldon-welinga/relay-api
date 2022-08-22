import { Field, Float, InputType } from '@nestjs/graphql';

import { CityDescription } from 'src/lib/descriptions';

@InputType({
  description: CityDescription.INSERT_CITY_INPUT,
})
export class InsertCityInput {
  @Field()
  country: string;

  @Field()
  name: string;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  latitude?: number;
}
