import request from './request';
import type { ApiResponse, PageResponse, RequestParams, UploadFile, UploadProgress } from './types';
import axios from 'axios';

interface ApiCallback<T = any> {
  onSuccess?: (data: T, response: ApiResponse<T>) => void;
  onError?: (error: any, message: string) => void;
  onFinally?: () => void;
}

interface PageApiCallback<T = any> {
  onSuccess?: (data: PageResponse<T>, response: ApiResponse<PageResponse<T>>) => void;
  onError?: (error: any, message: string) => void;
  onFinally?: () => void;
}

export const api = {
  get<T = any>(url: string, params?: RequestParams, callback?: ApiCallback<T>) {
    callback?.onFinally?.();
    
    return request
      .get<ApiResponse<T>>(url, { params })
      .then((response) => {
        const apiResponse = response.data;
        if (apiResponse.code === 200 || apiResponse.code === 0) {
          callback?.onSuccess?.(apiResponse.data, apiResponse);
        } else {
          const message = apiResponse.message || '请求失败';
          console.error('⚠️ 业务错误:', message);
          callback?.onError?.(apiResponse, message);
        }
        return response;
      })
      .catch((error) => {
        const message = error.message || '网络请求失败';
        callback?.onError?.(error, message);
        throw error;
      })
      .finally(() => {
        callback?.onFinally?.();
      });
  },

  post<T = any>(url: string, data?: any, callback?: ApiCallback<T>) {
    callback?.onFinally?.();
    
    return request
      .post<ApiResponse<T>>(url, data)
      .then((response) => {
        const apiResponse = response.data;
        if (apiResponse.code === 200 || apiResponse.code === 0) {
          callback?.onSuccess?.(apiResponse.data, apiResponse);
        } else {
          const message = apiResponse.message || '请求失败';
          console.error('⚠️ 业务错误:', message);
          callback?.onError?.(apiResponse, message);
        }
        return response;
      })
      .catch((error) => {
        const message = error.message || '网络请求失败';
        callback?.onError?.(error, message);
        throw error;
      })
      .finally(() => {
        callback?.onFinally?.();
      });
  },

  put<T = any>(url: string, data?: any, callback?: ApiCallback<T>) {
    callback?.onFinally?.();
    
    return request
      .put<ApiResponse<T>>(url, data)
      .then((response) => {
        const apiResponse = response.data;
        if (apiResponse.code === 200 || apiResponse.code === 0) {
          callback?.onSuccess?.(apiResponse.data, apiResponse);
        } else {
          const message = apiResponse.message || '请求失败';
          console.error('⚠️ 业务错误:', message);
          callback?.onError?.(apiResponse, message);
        }
        return response;
      })
      .catch((error) => {
        const message = error.message || '网络请求失败';
        callback?.onError?.(error, message);
        throw error;
      })
      .finally(() => {
        callback?.onFinally?.();
      });
  },

  patch<T = any>(url: string, data?: any, callback?: ApiCallback<T>) {
    callback?.onFinally?.();
    
    return request
      .patch<ApiResponse<T>>(url, data)
      .then((response) => {
        const apiResponse = response.data;
        if (apiResponse.code === 200 || apiResponse.code === 0) {
          callback?.onSuccess?.(apiResponse.data, apiResponse);
        } else {
          const message = apiResponse.message || '请求失败';
          console.error('⚠️ 业务错误:', message);
          callback?.onError?.(apiResponse, message);
        }
        return response;
      })
      .catch((error) => {
        const message = error.message || '网络请求失败';
        callback?.onError?.(error, message);
        throw error;
      })
      .finally(() => {
        callback?.onFinally?.();
      });
  },

  delete<T = any>(url: string, callback?: ApiCallback<T>) {
    callback?.onFinally?.();
    
    return request
      .delete<ApiResponse<T>>(url)
      .then((response) => {
        const apiResponse = response.data;
        if (apiResponse.code === 200 || apiResponse.code === 0) {
          callback?.onSuccess?.(apiResponse.data, apiResponse);
        } else {
          const message = apiResponse.message || '请求失败';
          console.error('⚠️ 业务错误:', message);
          callback?.onError?.(apiResponse, message);
        }
        return response;
      })
      .catch((error) => {
        const message = error.message || '网络请求失败';
        callback?.onError?.(error, message);
        throw error;
      })
      .finally(() => {
        callback?.onFinally?.();
      });
  },

  getPage<T = any>(url: string, params?: RequestParams, callback?: PageApiCallback<T>) {
    callback?.onFinally?.();
    
    return request
      .get<ApiResponse<PageResponse<T>>>(url, { params })
      .then((response) => {
        const apiResponse = response.data;
        if (apiResponse.code === 200 || apiResponse.code === 0) {
          callback?.onSuccess?.(apiResponse.data, apiResponse);
        } else {
          const message = apiResponse.message || '请求失败';
          console.error('⚠️ 业务错误:', message);
          callback?.onError?.(apiResponse, message);
        }
        return response;
      })
      .catch((error) => {
        const message = error.message || '网络请求失败';
        callback?.onError?.(error, message);
        throw error;
      })
      .finally(() => {
        callback?.onFinally?.();
      });
  },

  upload<T = any>(
    url: string,
    files: UploadFile[],
    data?: RequestParams,
    callbacks?: ApiCallback<T> & {
      onProgress?: (progress: UploadProgress) => void;
    }
  ) {
    callbacks?.onFinally?.();
    
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(file.name, file.file);
    });

    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    return request
      .post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          if (callbacks?.onProgress && event.total) {
            callbacks.onProgress({
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100),
            });
          }
        },
      })
      .then((response) => {
        const apiResponse = response.data;
        if (apiResponse.code === 200 || apiResponse.code === 0) {
          callbacks?.onSuccess?.(apiResponse.data, apiResponse);
        } else {
          const message = apiResponse.message || '上传失败';
          console.error('⚠️ 上传错误:', message);
          callbacks?.onError?.(apiResponse, message);
        }
        return response;
      })
      .catch((error) => {
        const message = error.message || '上传失败';
        callbacks?.onError?.(error, message);
        throw error;
      })
      .finally(() => {
        callbacks?.onFinally?.();
      });
  },

  download(url: string, filename?: string) {
    return request
      .get(url, {
        responseType: 'blob',
      })
      .then((response) => {
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename || `download_${Date.now()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        return response;
      })
      .catch((error) => {
        console.error('下载失败:', error);
        throw error;
      });
  },

  setToken(token: string) {
    request.setToken(token);
  },

  getToken() {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('读取 token 失败:', error);
      return null;
    }
  },

  clearToken() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('清除 token 失败:', error);
    }
  },

  setRetryConfig(count: number, delay: number) {
    request.setRetryConfig(count, delay);
  },
};

export { request };
export type { ApiResponse, PageResponse, RequestParams, UploadFile, UploadProgress };