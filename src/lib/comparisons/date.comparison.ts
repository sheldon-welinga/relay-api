import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description:
    'Boolean expression to compare columns of type "Date". All fields are combined with logical \'AND\'.',
})
export class Date_comparison_exp {
  @Field({ nullable: true })
  _eq: Date;

  @Field({ nullable: true })
  _gt: Date;

  @Field({ nullable: true })
  _gte: Date;

  @Field(() => [Date], { nullable: true })
  _in: Date[];

  @Field({ nullable: true })
  _is_null: boolean;

  @Field({ nullable: true })
  _lt: Date;

  @Field({ nullable: true })
  _lte: Date;

  @Field({ nullable: true })
  _neq: Date;

  @Field(() => [Date], { nullable: true })
  _nin: Date[];
}
