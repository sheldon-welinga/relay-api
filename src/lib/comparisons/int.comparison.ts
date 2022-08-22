import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({
  description:
    'Boolean expression to compare columns of type "Int". All fields are combined with logical \'AND\'.',
})
export class Int_comparison_exp {
  @Field(() => Int, { nullable: true })
  _eq: number;

  @Field(() => Int, { nullable: true })
  _gt: number;

  @Field(() => Int, { nullable: true })
  _gte: number;

  @Field(() => [Int], { nullable: true })
  _in: number[];

  @Field(() => Int, { nullable: true })
  _is_null: boolean;

  @Field(() => Int, { nullable: true })
  _lt: number;

  @Field(() => Int, { nullable: true })
  _lte: number;

  @Field(() => Int, { nullable: true })
  _neq: number;

  @Field(() => [Int], { nullable: true })
  _nin: number[];
}
