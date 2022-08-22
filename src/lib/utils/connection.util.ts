import { BadRequestException } from '@nestjs/common';
import { ConnectionCursor, fromGlobalId } from 'graphql-relay';

import { ConnectionArgs } from 'src/lib/connections';
import { PagingGlobal } from 'src/lib/global';
import { PaginatedParameters, PagingMeta } from 'src/lib/types';
import { ConnectionPaginationErrors } from 'src/lib/errors';

export const checkPagingSanity = (args: ConnectionArgs): PagingMeta => {
  const { first = 0, last = 0, after, before } = args;

  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last || !!before;
  if (isForwardPaging && isBackwardPaging) {
    throw new BadRequestException(
      ConnectionPaginationErrors.PAGINATION_BACKWARD_AND_FORWARD_ERROR,
    );
  }
  if ((isForwardPaging && before) || (isBackwardPaging && after)) {
    throw new BadRequestException(
      ConnectionPaginationErrors.PAGINATION_INCOMPATIBILITY_ERROR,
    );
  }
  if ((isForwardPaging && first < 0) || (isBackwardPaging && last < 0)) {
    throw new BadRequestException(
      ConnectionPaginationErrors.PAGINATION_LIMIT_ERROR,
    );
  }
  if (last && !before) {
    throw new BadRequestException(
      ConnectionPaginationErrors.PAGINATION_MISSING_BEFORE_ARGUMENT_ERROR,
    );
  }

  return isForwardPaging
    ? { pagingType: PagingGlobal.forward, after, first }
    : isBackwardPaging
    ? { pagingType: PagingGlobal.backward, before, last }
    : { pagingType: PagingGlobal.none };
};

export const getId = (cursor: ConnectionCursor) =>
  parseInt(fromGlobalId(cursor).id, 10);

export const nextId = (cursor: ConnectionCursor) => getId(cursor) + 1;

export const getPagingParameters = (
  args: ConnectionArgs,
): PaginatedParameters => {
  const meta = checkPagingSanity(args);

  switch (meta.pagingType) {
    case PagingGlobal.forward: {
      return {
        limit: meta.first,
        offset: meta.after ? nextId(meta.after) : 0,
      };
    }
    case PagingGlobal.backward: {
      const { last, before } = meta;
      let limit = last;
      let offset = getId(before) - last;

      if (offset < 0) {
        limit = Math.max(last + offset, 0);
        offset = 0;
      }

      return { offset, limit };
    }
    default:
      return {};
  }
};
