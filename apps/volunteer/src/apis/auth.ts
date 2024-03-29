import { axiosInstance } from '@anifriends/apis';
import type {
  ChangePasswordRequestData,
  CheckDuplicatedEmailRequestData,
  CheckDuplicatedEmailResponseData,
  SigninRequestData,
  SigninResponseData,
} from '@anifriends/types';

import { SignupRequestData } from '@/types/apis/auth';

export const signinVolunteer = (data: SigninRequestData) =>
  axiosInstance.post<SigninResponseData, SigninRequestData>(
    '/auth/volunteers/login',
    data,
  );

export const signupVolunteer = (data: SignupRequestData) =>
  axiosInstance.post<unknown, SigninRequestData>('/volunteers', data);

export const checkDuplicatedVolunteerEmail = (
  data: CheckDuplicatedEmailRequestData,
) =>
  axiosInstance.post<
    CheckDuplicatedEmailResponseData,
    CheckDuplicatedEmailRequestData
  >('/volunteers/email', data);

export const changeVolunteerPassword = (data: ChangePasswordRequestData) =>
  axiosInstance.patch<unknown, ChangePasswordRequestData>(
    '/volunteers/me/passwords',
    data,
  );
