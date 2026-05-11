import { api } from '@/utils/axios';
import type { ApiCallback, PageApiCallback } from '@/utils/axios';

export interface UserInfo {
  id: number;
  name: string;
  age: number;
  email: string;
  avatar?: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}

export const userApi = {
  login: (data: LoginParams, callback?: ApiCallback<LoginResponse>) => 
    api.post<LoginResponse>('/user/login', data, callback),

  logout: (callback?: ApiCallback<void>) => 
    api.post('/user/logout', undefined, callback),

  getUserInfo: (id: number, callback?: ApiCallback<UserInfo>) => 
    api.get<UserInfo>(`/user/${id}`, undefined, callback),

  updateUser: (data: Partial<UserInfo>, callback?: ApiCallback<UserInfo>) => 
    api.put<UserInfo>('/user', data, callback),

  getUserList: (
    params?: { page?: number; pageSize?: number },
    callback?: PageApiCallback<UserInfo>
  ) => api.getPage<UserInfo>('/user/list', params, callback),
};