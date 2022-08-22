import { Field, InputType } from '@nestjs/graphql';

import { Date_comparison_exp, Int_comparison_exp } from 'src/lib/comparisons';

@InputType({
  description:
    "Boolean expression to filter rows from the common fields of tables. All fields are combined with a logical 'AND'.",
})
export class BaseInputBoolExp {
  @Field(() => Int_comparison_exp, { nullable: true })
  id?: Int_comparison_exp;

  @Field(() => Date_comparison_exp, { nullable: true })
  createdAt?: Date_comparison_exp;

  @Field(() => Date_comparison_exp, { nullable: true })
  updatedAt?: Date_comparison_exp;

  @Field(() => Date_comparison_exp, { nullable: true })
  deletedAt?: Date_comparison_exp;
}
