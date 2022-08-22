import { Filter } from 'src/lib/types';
import { FilterKindEnum } from 'src/lib/enums';

export const parseFilter = (f: Filter): any => {
  switch (f.kind) {
    case FilterKindEnum.value:
      return f.operator
        ? {
            [f.key]: f.operator(f.value),
          }
        : {};

    case FilterKindEnum.relationship:
      return {
        [f.key]: parseFilter(f.value),
      };
    case FilterKindEnum.operator:
      return {
        [f.key]: f.value.map((opFilter) => parseFilter(opFilter)),
      };
    default:
      return parseFilter(f);
  }
};
