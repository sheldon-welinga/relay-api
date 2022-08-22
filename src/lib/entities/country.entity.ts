import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { City } from 'src/lib/entities';
import { Node } from 'src/lib/interfaces';
import { CityConnectionRelation } from 'src/lib/relations';
import { ColumnTypeGlobal, JoinColumnNameGlobal } from 'src/lib/global';
import { CityDescription } from 'src/lib/descriptions';
import { EntityEnum } from 'src/lib/enums';

@Entity(EntityEnum.countries)
@ObjectType({ implements: Node })
export class Country implements Node {
  @Field(() => ID)
  id: string;

  @PrimaryColumn({ type: ColumnTypeGlobal.text, unique: true })
  @Field()
  code: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ type: ColumnTypeGlobal.decimal, nullable: true })
  @Field(() => Float, { nullable: true })
  longitude: number;

  @Column({ type: ColumnTypeGlobal.decimal, nullable: true })
  @Field(() => Float, { nullable: true })
  latitude: number;

  @OneToMany(() => City, (city) => city.city_country)
  @JoinColumn({
    name: JoinColumnNameGlobal.cities,
    referencedColumnName: JoinColumnNameGlobal.city_country,
  })
  @Field(() => [City], { description: CityDescription.CITIES_RELATION })
  cities: City[];

  @Field(() => CityConnectionRelation, { defaultValue: [] })
  cities_connection: CityConnectionRelation;
}
