import { Field, Float, InputType } from '@nestjs/graphql';

import { CountryDescription } from 'src/lib/descriptions';
import { InsertCityInput } from 'src/lib/inputs';

@InputType({
  description: CountryDescription.INSERT_COUNTRY_INPUT,
})
export class InsertCountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => [InsertCityInput], { defaultValue: [] })
  cities: InsertCityInput[];
}
