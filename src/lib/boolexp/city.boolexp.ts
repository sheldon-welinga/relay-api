import { Field, InputType } from '@nestjs/graphql';

import {
  Float_comparison_exp,
  String_comparison_exp,
} from 'src/lib/comparisons';
import { BaseInputBoolExp, CountryInputBoolExp } from 'src/lib/boolexp';

@InputType({
  description:
    'Boolean expression to filter rows from the table "cities". All fields are combined with a logical \'AND\'.',
})
export class CityInputBoolExp extends BaseInputBoolExp {
  @Field(() => CountryInputBoolExp, { nullable: true })
  city_country?: CountryInputBoolExp;

  @Field(() => String_comparison_exp, { nullable: true })
  country?: String_comparison_exp;

  @Field(() => String_comparison_exp, { nullable: true })
  name?: String_comparison_exp;

  @Field(() => Float_comparison_exp, { nullable: true })
  longitude?: Float_comparison_exp;

  @Field(() => Float_comparison_exp, { nullable: true })
  latitude?: Float_comparison_exp;
}
