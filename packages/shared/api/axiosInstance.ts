import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { BASE_URL } from '@/constants/baseURL';

import {
  onErrorRequest,
  onErrorResponse,
  onRequest,
  onResponse,
} from './axiosInterceptor';

type interceptors = {
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
  }: interceptors): AxiosService {
    if (!AxiosService.instance) {
      const axiosInstance = axios.create({ baseURL: BASE_URL });
      axiosInstance.interceptors.request.use(onRequest, onErrorRequest);
      axiosInstance.interceptors.response.use(onResponse, onErrorResponse);
      this.instance = new AxiosService(axiosInstance);
    }
    return this.instance;
  }

  public get<Response, Request = unknown>(
    url: string,
    config?: AxiosRequestConfig<Request>,
  ) {
    return this.axiosInstance.get<Response>(url, config);
  }

  public post<Response, Request>(url: string, data: Request) {
    return this.axiosInstance.post<Response>(url, data);
  }

  public delete<Response = unknown, Request = unknown>(
    url: string,
    config?: AxiosRequestConfig<Request>,
  ) {
    return this.axiosInstance.delete<Response>(url, config);
  }

  public patch<Request, Response = unknown>(url: string, data: Request) {
    return this.axiosInstance.patch<Response>(url, data);
  }
}

export default AxiosService.getInstance({
  onRequest,
  onErrorRequest,
  onResponse,
  onErrorResponse,
});
