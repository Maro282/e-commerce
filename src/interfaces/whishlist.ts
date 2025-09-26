export interface IWhishlistResponse<T> {
  status: string;
  message?: string;
  count?: number;
  data: T[];
}
