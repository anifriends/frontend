import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import useAuthStore from '../store/authStore';

const getAccessToken = () =>
  `bearer ${useAuthStore.getState().user?.accessToken}`;

export const onRequest = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = getAccessToken();
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
