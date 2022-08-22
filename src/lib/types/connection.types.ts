import { PagingGlobal } from 'src/lib/global';
export interface ForwardPagingMeta {
  pagingType: PagingGlobal.forward;
  after?: string;
  first: number;
}

export interface BackwardPagingMeta {
  pagingType: PagingGlobal.backward;
  before?: string;
  last: number;
}

export interface NonePagingMeta {
  pagingType: PagingGlobal.none;
}

export type PagingMeta =
  | ForwardPagingMeta
  | BackwardPagingMeta
  | NonePagingMeta;

export interface PaginatedParameters {
  limit?: number;
  offset?: number;
}

export interface PageOffsetArgs {
  skip?: number;
  take?: number;
}
