import { useAuthStore } from '@anifriends/store';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const onRequest = (config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().user?.accessToken;
  if (useAuthStore.getState().user?.accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
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
