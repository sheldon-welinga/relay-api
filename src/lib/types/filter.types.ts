import { FindOperator } from 'typeorm';

import { FilterKindEnum } from 'src/lib/enums';

export type Nullable<T> = T | null | undefined;

/*
 * Value filter. Eg: { name: { _eq: "jondoe" } }
 */

export type ValueFilter = {
  kind: FilterKindEnum.value;
  key: string;
  operator: (value: unknown) => FindOperator<unknown>;
  value: string;
};

/*
 * Constructor for value filter
 */
export const makeValueFilter = (
  key: string,
  operator: (value: unknown) => FindOperator<unknown>,
  value: string,
): ValueFilter => ({ kind: FilterKindEnum.value, key, operator, value });

/*
 * Relationship filter filter. Eg: { user { name: { $eq: "jondoe" } } }
 */

type RelationshipFilter = {
  kind: FilterKindEnum.relationship;
  key: string;
  value: Filter;
};

/*
 * Constructor for relationship filter
 */
export const makeRelationshipFilter = (
  key: string,
  value: Filter,
): RelationshipFilter => ({ kind: FilterKindEnum.relationship, key, value });

/*
 * Filter with logical gates
 * Eg: { $and: [ { title: { _eq: "My Title" } }, { author: { name: { _eq: "jon" }}} ]}
 */

type LogicGate = '_or' | '_and' | '_not';

export type OperatorFilter = {
  kind: FilterKindEnum.operator;
  key: LogicGate;
  value: Filter[];
};

/*
 * Constructor for operation filter
 */
export const makeOperationFilter = (
  key: LogicGate,
  value: Filter[],
): OperatorFilter => ({ kind: FilterKindEnum.operator, key, value });

export type Filter = ValueFilter | RelationshipFilter | OperatorFilter;
