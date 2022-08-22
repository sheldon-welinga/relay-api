import { getOffsetWithDefault } from 'graphql-relay';
import { ConnectionArgs } from '../connections/args.connection';
import { PageOffsetArgs } from 'src/lib/types';

export const getPageOffset = (
  totalCount: number,
  args: ConnectionArgs,
): PageOffsetArgs => {
  const { before, after, first, last } = args;

  // offsets
  const beforeOffset = getOffsetWithDefault(before, totalCount);
  const afterOffset = getOffsetWithDefault(after, -1);

  let startOffset = Math.max(-1, afterOffset) + 1;
  let endOffset = Math.min(beforeOffset, totalCount);

  if (first) {
    endOffset = Math.min(endOffset, startOffset + first);
  }

  if (last) {
    startOffset = Math.max(startOffset, endOffset - last);
  }

  // skip, take
  const skip = Math.max(startOffset, 0); // sql offset
  const take = Math.max(endOffset - startOffset, 1); // sql limit

  return {
    skip,
    take,
  };
};
