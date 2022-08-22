import { Field, InputType } from '@nestjs/graphql';

import {
  Float_comparison_exp,
  String_comparison_exp,
} from 'src/lib/comparisons';
import { CityInputBoolExp } from 'src/lib/boolexp';

@InputType({
  description:
    'Boolean expression to filter rows from the table "countries". All fields are combined with a logical \'AND\'.',
})
export class CountryInputBoolExp {
  @Field(() => String_comparison_exp, { nullable: true })
  code?: String_comparison_exp;

  @Field(() => String_comparison_exp, { nullable: true })
  name?: String_comparison_exp;

  @Field(() => Float_comparison_exp, { nullable: true })
  longitude?: Float_comparison_exp;

  @Field(() => Float_comparison_exp, { nullable: true })
  latitude?: Float_comparison_exp;

  @Field(() => [CityInputBoolExp], { nullable: true })
  cities?: CityInputBoolExp[];
}
