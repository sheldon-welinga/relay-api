import { ArgsType, Field } from '@nestjs/graphql';
import { ConnectionArguments, ConnectionCursor } from 'graphql-relay';

import { getPagingParameters } from 'src/lib/utils';
import { PaginatedParameters } from 'src/lib/types';
import { ConnectionDescription } from 'src/lib/descriptions';

@ArgsType()
export class ConnectionArgs implements ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description: ConnectionDescription.PAGINATE_BEFORE,
  })
  public before?: ConnectionCursor;

  @Field(() => String, {
    nullable: true,
    description: ConnectionDescription.PAGINATE_AFTER,
  })
  public after?: ConnectionCursor;

  @Field(() => Number, {
    nullable: true,
    description: ConnectionDescription.PAGINATE_FIRST,
  })
  public first?: number;

  @Field(() => Number, {
    nullable: true,
    description: ConnectionDescription.PAGINATE_LAST,
  })
  public last?: number;

  pagingParams(): PaginatedParameters {
    return getPagingParameters(this);
  }
}
