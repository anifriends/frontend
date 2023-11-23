import type { SigninResponseData } from 'types/apis/auth';

import axiosInstance from '../axiosInstance';

export const getAccessTokenAPI = () =>
  axiosInstance.post<SigninResponseData>('/auth/refresh');
