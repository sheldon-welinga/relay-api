import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BaseInput {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt: Date;
}
