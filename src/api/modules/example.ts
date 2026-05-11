import { api } from '@/utils/axios';
import type { ApiCallback, PageApiCallback } from '@/utils/axios';

export interface ExampleData {
  id: number;
  name: string;
  description: string;
}

export const exampleApi = {
  getList: (
    params?: { page?: number; pageSize?: number },
    callback?: PageApiCallback<ExampleData>
  ) => api.getPage<ExampleData>('https://restapi.amap.com/v3/geocode/regeo', params, callback),

  getDetail: (id: number, callback?: ApiCallback<ExampleData>) => 
    api.get<ExampleData>(`/example/${id}`, undefined, callback),

  create: (data: Partial<ExampleData>, callback?: ApiCallback<ExampleData>) => 
    api.post<ExampleData>('/example', data, callback),

  update: (data: Partial<ExampleData>, callback?: ApiCallback<ExampleData>) => 
    api.put<ExampleData>('/example', data, callback),

  delete: (id: number, callback?: ApiCallback<void>) => 
    api.delete(`/example/${id}`, callback),
};