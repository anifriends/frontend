import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const onRequest = (config: InternalAxiosRequestConfig) => {
  return config;
};

export const onRequestError = (error: Error) => {
  return Promise.reject(error);
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const onResponseError = (error: Error) => {
  return Promise.reject(error);
};
