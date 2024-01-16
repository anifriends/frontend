import type { SigninResponseData } from '@anifriends/types';

import { axiosInstance } from '../axiosInstance';

export const getAccessTokenAPI = () =>
  axiosInstance.post<SigninResponseData>('/auth/refresh');
