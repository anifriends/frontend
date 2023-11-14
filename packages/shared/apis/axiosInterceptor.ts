import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const onRequest = (config: InternalAxiosRequestConfig) => config;

export const onErrorRequest = (error: Error) => {
  return Promise.reject(error);
};
export const onResponse = (response: AxiosResponse) => response;
export const onErrorResponse = (error: Error) => {
  return Promise.reject(error);
};

export default {
  onRequest,
  onErrorRequest,
  onResponse,
  onErrorResponse,
};
