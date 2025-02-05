export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface IError {
  code: string;
  message: string;
  details?: string;
}