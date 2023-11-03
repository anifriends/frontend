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

  public async get<Response, Request>(
    url: string,
    config: AxiosRequestConfig<Request>,
  ): Promise<Response> {
    const response = await this.axiosInstance.get<Response>(url, config);
    return response.data;
  }

  public async post<Response, Request>(
    url: string,
    data: Request,
  ): Promise<Response> {
    const response = await this.axiosInstance.post<Response>(url, data);
    return response.data;
  }

  public async delete<Response, Request>(
    url: string,
    config: AxiosRequestConfig<Request>,
  ): Promise<Response> {
    const response = await this.axiosInstance.delete<Response>(url, config);
    return response.data;
  }

  public async patch<Response, Request>(
    url: string,
    data: Request,
  ): Promise<Response> {
    const response = await this.axiosInstance.patch<Response>(url, data);
    return response.data;
  }
}

export default AxiosService.getInstance({
  onRequest,
  onErrorRequest,
  onResponse,
  onErrorResponse,
});
