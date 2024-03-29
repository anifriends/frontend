import { BASE_URL } from '@anifriends/constants';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import {
  onErrorRequest,
  onErrorResponse,
  onRequest,
  onResponse,
} from './axiosInterceptor';

type Interceptors = {
  onRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  onErrorRequest: (error: Error) => void | Promise<never>;
  onResponse: (response: AxiosResponse) => AxiosResponse;
  onErrorResponse: (error: Error) => void | Promise<never>;
};

class AxiosService {
  private static instance: AxiosService;

  private constructor(private axiosInstance: AxiosInstance) {}

  public static getInstance({
    onRequest,
    onErrorRequest,
    onResponse,
    onErrorResponse,
  }: Interceptors): AxiosService {
    if (!AxiosService.instance) {
      const axiosInstance = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
      });

      axiosInstance.interceptors.request.use(onRequest, onErrorRequest);
      axiosInstance.interceptors.response.use(onResponse, onErrorResponse);
      this.instance = new AxiosService(axiosInstance);
    }

    return this.instance;
  }

  get<Response, Request = unknown>(
    url: string,
    config?: AxiosRequestConfig<Request>,
  ) {
    return this.axiosInstance.get<Response>(url, config);
  }

  post<Response = unknown, Request = unknown>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig<Request>,
  ) {
    return this.axiosInstance.post<Response>(url, data, config);
  }

  delete<Response = unknown, Request = unknown>(
    url: string,
    config?: AxiosRequestConfig<Request>,
  ) {
    return this.axiosInstance.delete<Response>(url, config);
  }

  patch<Response = unknown, Request = unknown>(url: string, data?: Request) {
    return this.axiosInstance.patch<Response>(url, data);
  }
}

export const axiosInstance = AxiosService.getInstance({
  onRequest,
  onErrorRequest,
  onResponse,
  onErrorResponse,
});
