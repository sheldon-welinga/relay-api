import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { ColumnDateGlobal } from 'src/lib/global';

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({
    type: ColumnDateGlobal.type,
    default: () => ColumnDateGlobal.default,
    update: false,
  })
  @Field()
  createdAt: Date;

  @Column({
    type: ColumnDateGlobal.type,
    default: () => ColumnDateGlobal.default,
    update: true,
  })
  @Field()
  updatedAt: Date;

  @Column({ type: ColumnDateGlobal.type, nullable: true })
  @Field({ nullable: true })
  deletedAt: Date;
}
