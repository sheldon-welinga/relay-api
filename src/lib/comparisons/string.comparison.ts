import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description:
    'Boolean expression to compare columns of type "String". All fields are combined with logical \'AND\'.',
})
export class String_comparison_exp {
  @Field({ nullable: true })
  _eq: string;

  @Field({ nullable: true })
  _gt: string;

  @Field({ nullable: true })
  _gte: string;

  @Field({ nullable: true })
  _ilike: string;

  @Field(() => [String], { nullable: true })
  _in: string[];

  @Field({ nullable: true })
  _iregex: string;

  @Field({ nullable: true })
  _is_null: boolean;

  @Field({ nullable: true })
  _like: string;

  @Field({ nullable: true })
  _lt: string;

  @Field({ nullable: true })
  _lte: string;

  @Field({ nullable: true })
  _neq: string;

  @Field({ nullable: true })
  _nilike: string;

  @Field(() => [String], { nullable: true })
  _nin: string[];

  @Field({ nullable: true })
  _niregex: string;

  @Field({ nullable: true })
  _nlike: string;

  @Field({ nullable: true })
  _nregex: string;

  @Field({ nullable: true })
  _nsimilar: string;

  @Field({ nullable: true })
  _regex: string;

  @Field({ nullable: true })
  _similar: string;
}
