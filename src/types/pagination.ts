export interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Pagination {
  currentPage: number;
  // firstPageUrl: string;
  from: number;
  lastPage: number;
  // lastPageUrl: string;
  // links: PaginationLinks[];
  // nextPageUrl: string | null;
  // path: string;
  perPage: number;
  // prevPageUrl: string | null;
  to: number;
  total: number;
}

export interface DataWithPagination<T> extends Pagination {
  data: T[];
}

export interface PaginationRequest {
  page: number;
  perPage: number;
}
