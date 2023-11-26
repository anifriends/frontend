import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import useAuthStore from '../store/authStore';

export const onRequest = (config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().user?.accessToken;
  if (useAuthStore.getState().user?.accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }
  return config;
};

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
