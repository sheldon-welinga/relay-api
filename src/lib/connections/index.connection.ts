import { Type } from '@nestjs/common';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Connection as RelayConnection,
  ConnectionCursor,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';

const typeMap = {};

export const Connection = <T>(type: Type<T>): any => {
  const { name } = type;
  if (typeMap[`${name}`]) return typeMap[`${name}`];

  @ObjectType(`${name}Edge`, { isAbstract: true })
  class Edge<E> implements RelayEdge<E> {
    public name = `${name}Edge`;

    @Field({ nullable: true })
    public cursor!: ConnectionCursor;

    @Field(() => type, { nullable: true })
    public node!: E;
  }

  @ObjectType(`${name}PageInfo`, { isAbstract: true })
  class PageInfo implements RelayPageInfo {
    @Field({ nullable: true })
    public startCursor!: ConnectionCursor;

    @Field({ nullable: true })
    public endCursor!: ConnectionCursor;

    @Field(() => Boolean)
    public hasPreviousPage!: boolean;

    @Field(() => Boolean)
    public hasNextPage!: boolean;
  }

  @ObjectType(`${name}Connection`, { isAbstract: true })
  class Connection implements RelayConnection<T> {
    public name = `${name}Connection`;

    @Field(() => [Edge<T>], { nullable: true })
    public edges!: Edge<T>[];

    @Field(() => PageInfo, { nullable: true })
    public pageInfo!: PageInfo;
  }

  typeMap[`${name}`] = Connection;
  return typeMap[`${name}`];
};
