export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  timestamp?: number;
}

export interface PageResponse<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore?: boolean;
}

export interface RequestParams {
  [key: string]: any;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
  url: string;
  method: HttpMethod;
  params?: RequestParams;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  noRetry?: boolean;
}

export interface UploadFile {
  name: string;
  file: File;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}