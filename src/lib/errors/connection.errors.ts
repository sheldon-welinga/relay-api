export enum ConnectionPaginationErrors {
  PAGINATION_BACKWARD_AND_FORWARD_ERROR = 'Relay pagination cannot be forwards AND backwards!',
  PAGINATION_INCOMPATIBILITY_ERROR = 'Paging must use either first/after or last/before!',
  PAGINATION_LIMIT_ERROR = 'Paging limit must be positive!',
  PAGINATION_MISSING_BEFORE_ARGUMENT_ERROR = "When paging backwards, a 'before' argument is required!",
}
