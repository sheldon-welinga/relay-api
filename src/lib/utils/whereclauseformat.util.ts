import { parseFilter, allOperators } from 'src/lib/utils';
import { FilterKindEnum } from 'src/lib/enums';

export const whereClauseFormat = <T>(where?: T) => {
  if (!where) return;

  const filters = Object.entries(where).map(([key, value]) => {
    const operatorKey = value && Object.keys(value)[0];
    const operator = allOperators[operatorKey];
    const operatorValue = value?.[operatorKey];

    return parseFilter({
      key,
      kind: FilterKindEnum.value,
      operator: operator.operator,
      value: operatorValue,
    });
  });

  const reduced = filters.reduce((obj, item) => ({ ...obj, ...item }), {});

  return reduced;
};
