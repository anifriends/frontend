import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from './axiosInterceptor';

const BASE_URL = '/example';

class AxiosService {
  private static instance: AxiosInstance;

  private constructor() {}

  private static getInstance(): AxiosInstance {
    if (!AxiosService.instance) {
      AxiosService.instance = axios.create({ baseURL: BASE_URL });
      AxiosService.addInterceptors(AxiosService.instance);
    }
    return AxiosService.instance;
  }

  private static addInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(onRequest, onRequestError);
    instance.interceptors.response.use(onResponse, onResponseError);
  }

  public static async get<T, U>(
    url: string,
    config: AxiosRequestConfig<U>,
  ): Promise<T> {
    const instance = AxiosService.getInstance();
    const response = await instance.get<T>(url, config);
    return response.data;
  }

  public static async post<T, U>(url: string, data: U): Promise<T> {
    const instance = this.getInstance();
    const response = await instance.post<T>(url, data);
    return response.data;
  }

  public static async delete<T, U>(
    url: string,
    config: AxiosRequestConfig<U>,
  ): Promise<T> {
    const instance = this.getInstance();
    const response = await instance.delete<T>(url, config);
    return response.data;
  }

  public static async patch<T, U>(url: string, data: U): Promise<T> {
    const instance = this.getInstance();
    const response = await instance.patch<T>(url, data);
    return response.data;
  }
}

export default AxiosService;
