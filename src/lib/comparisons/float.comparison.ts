import { Field, InputType, Float } from '@nestjs/graphql';

@InputType({
  description:
    'Boolean expression to compare columns of type "Float". All fields are combined with logical \'AND\'.',
})
export class Float_comparison_exp {
  @Field(() => Float, { nullable: true })
  _eq: number;

  @Field(() => Float, { nullable: true })
  _gt: number;

  @Field(() => Float, { nullable: true })
  _gte: number;

  @Field(() => [Float], { nullable: true })
  _in: number[];

  @Field(() => Float, { nullable: true })
  _is_null: boolean;

  @Field(() => Float, { nullable: true })
  _lt: number;

  @Field(() => Float, { nullable: true })
  _lte: number;

  @Field(() => Float, { nullable: true })
  _neq: number;

  @Field(() => [Float], { nullable: true })
  _nin: number[];
}
