import {
  Equal,
  FindOperator,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ILike,
} from 'typeorm';
import {
  OperatorAliasEnum,
  OperatorDefaultEnum,
  OperatorNameEnum,
} from 'src/lib/enums';

export const allOperators = {
  _eq: {
    name: OperatorNameEnum.equals,
    operator: Equal,
    alias: OperatorAliasEnum._eq,
  },
  _neq: {
    name: OperatorNameEnum.not_equals,
    operator: Not,
    alias: OperatorAliasEnum._neq,
  },
  _in: {
    name: OperatorNameEnum.in,
    operator: In,
    alias: OperatorAliasEnum._in,
    default: OperatorDefaultEnum.empty_array,
  },
  _nin: {
    name: OperatorNameEnum.not_in,
    operator: (value: unknown[] | FindOperator<unknown>) => Not(In(value)),
    alias: OperatorAliasEnum._nin,
    default: OperatorDefaultEnum.empty_array,
  },
  _gt: {
    name: OperatorNameEnum.greater_than,
    operator: MoreThan,
    alias: OperatorAliasEnum._gt,
  },
  _lt: {
    name: OperatorNameEnum.less_than,
    operator: LessThan,
    alias: OperatorAliasEnum._lt,
  },
  _gte: {
    name: OperatorNameEnum.greater_than_equals,
    operator: MoreThanOrEqual,
    alias: OperatorAliasEnum._gte,
  },
  _lte: {
    name: OperatorNameEnum.less_than_equals,
    operator: LessThanOrEqual,
    alias: OperatorAliasEnum._lte,
  },
  _like: {
    name: OperatorNameEnum.like,
    operator: Like,
    alias: OperatorAliasEnum._like,
    default: OperatorDefaultEnum.double_percent,
  },
  _nlike: {
    name: OperatorNameEnum.not_like,
    operator: (value: unknown) => Not(Like(value)),
    alias: OperatorAliasEnum._nlike,
    default: OperatorDefaultEnum.double_percent,
  },
  _ilike: {
    name: OperatorNameEnum.like_case_insensitive,
    operator: ILike,
    alias: OperatorAliasEnum._ilike,
    default: OperatorDefaultEnum.double_percent,
  },
  _nilike: {
    name: OperatorNameEnum.not_like_case_insensitive,
    operator: (value: unknown) => Not(ILike(value)),
    alias: OperatorAliasEnum._nilike,
    default: OperatorDefaultEnum.double_percent,
  },
  _regex: {
    name: OperatorNameEnum.tilde,
    operator: Like,
    alias: OperatorAliasEnum._regex,
  },
  _iregex: {
    name: OperatorNameEnum.all_tilde,
    operator: (value: unknown) => ILike(value),
    alias: OperatorAliasEnum._iregex,
  },
  _nregex: {
    name: OperatorNameEnum.not_tilde,
    operator: (value: unknown) => Not(Like(value)),
    alias: OperatorAliasEnum._nregex,
  },
  _niregex: {
    name: OperatorNameEnum.not_all_tilde,
    operator: (value: unknown) => Not(ILike(value)),
    alias: OperatorAliasEnum._niregex,
  },
};
