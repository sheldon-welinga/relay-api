import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Country, BaseEntity } from 'src/lib/entities';
import { ColumnTypeGlobal, JoinColumnNameGlobal } from 'src/lib/global';
import { EntityEnum } from 'src/lib/enums';
import { Node } from '../interfaces/node.interface';

@Entity(EntityEnum.cities)
@ObjectType({ implements: Node })
export class City extends BaseEntity implements Node {
  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ type: ColumnTypeGlobal.decimal, nullable: true })
  @Field(() => Float, { nullable: true })
  longitude: number;

  @Column({ type: ColumnTypeGlobal.decimal, nullable: true })
  @Field(() => Float, { nullable: true })
  latitude: number;

  @Column()
  @Field()
  country: string;

  @ManyToOne(() => Country, { onUpdate: 'CASCADE' })
  @JoinColumn({
    name: JoinColumnNameGlobal.city_country,
    referencedColumnName: JoinColumnNameGlobal.code,
  })
  @Field(() => Country, { defaultValue: [] })
  city_country: Country;
}
