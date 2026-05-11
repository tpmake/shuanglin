import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;
const RETRY_COUNT = Number(import.meta.env.VITE_API_RETRY_COUNT) || 0;
const RETRY_DELAY = Number(import.meta.env.VITE_API_RETRY_DELAY) || 1000;

class Request {
  private instance: AxiosInstance;
  private retryCount: number;
  private retryDelay: number;

  constructor() {
    this.retryCount = RETRY_COUNT;
    this.retryDelay = RETRY_DELAY;

    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (import.meta.env.DEV) {
          console.group('🚀 HTTP Request');
          console.log('URL:', config.url);
          console.log('Method:', config.method);
          console.log('Headers:', config.headers);
          console.log('Params:', config.params);
          console.log('Data:', config.data);
          console.groupEnd();
        }

        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (import.meta.env.DEV) {
          console.group('✅ HTTP Response');
          console.log('URL:', response.config.url);
          console.log('Status:', response.status);
          console.log('Data:', response.data);
          console.groupEnd();
        }
        return response;
      },
      async (error: AxiosError) => {
        const config = error.config;

        if (import.meta.env.DEV) {
          console.group('❌ HTTP Error');
          console.log('URL:', config?.url);
          console.log('Status:', error.response?.status);
          console.log('Message:', error.message);
          console.groupEnd();
        }

        if (error.response) {
          this.handleHttpError(error.response.status, error.response.data, config?.url);
        } else if (error.request) {
          console.error('🌐 网络错误，请检查网络连接');
        }

        return Promise.reject(error);
      }
    );
  }

  private handleHttpError(status: number, data: any, url?: string) {
    const errorMessages: Record<number, string> = {
      400: '请求参数错误',
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: `请求的资源不存在：${url}`,
      408: '请求超时',
      409: '请求冲突',
      422: '数据验证失败',
      429: '请求过多，请稍后重试',
      500: '服务器内部错误',
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时',
    };

    const message = errorMessages[status] || `未知错误：${status}`;
    console.error(`⚠️ ${message}`);

    if (status === 401) {
      this.clearToken();
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }

    if (status >= 500 && status < 600) {
      console.error('💾 服务器错误详情:', data);
    }
  }

  private getToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('读取 token 失败:', error);
      return null;
    }
  }

  private clearToken(): void {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('清除 token 失败:', error);
    }
  }

  public setToken(token: string): void {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('保存 token 失败:', error);
    }
  }

  private async retryRequest(config: AxiosRequestConfig, retryCount: number): Promise<AxiosResponse> {
    for (let i = 0; i < retryCount; i++) {
      try {
        console.log(`🔄 第 ${i + 1} 次重试...`);
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay * (i + 1)));
        return await this.instance.request(config);
      } catch (error) {
        if (i === retryCount - 1) {
          throw error;
        }
      }
    }
    throw new Error('请求重试失败');
  }

  public async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.request<T>(config);
    } catch (error) {
      if (this.retryCount > 0 && !(error as AxiosError).config?.headers?.['X-No-Retry']) {
        return await this.retryRequest(config, this.retryCount);
      }
      throw error;
    }
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'POST', data });
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PUT', data });
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PATCH', data });
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }

  public setRetryConfig(count: number, delay: number): void {
    this.retryCount = count;
    this.retryDelay = delay;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

export default new Request();