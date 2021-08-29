export interface PaginateResponse<T> {
  total: number;
  page: number;
  last_page: number;
  result?: T;
}
