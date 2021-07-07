export interface DefaultResponse<T> {
  status: number;
  message: string;
  data?: T;
}
