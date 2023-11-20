import axiosInstance from 'shared/apis/axiosInstance';
import type {
  ChangePasswordRequestData,
  CheckDuplicatedEmailRequestData,
  CheckDuplicatedEmailResponseData,
  SigninRequestData,
  SigninResponseData,
} from 'shared/types/apis/auth';

import { SignupRequestData } from '@/types/apis/auth';

export const signinShelter = (data: SigninRequestData) =>
  axiosInstance.post<SigninResponseData, SigninRequestData>(
    '/auth/shelters/login',
    data,
  );

export const signupShelter = (data: SignupRequestData) =>
  axiosInstance.post<unknown, SignupRequestData>('/shelters', data);

export const checkDuplicatedShelterEmail = (
  data: CheckDuplicatedEmailRequestData,
) =>
  axiosInstance.post<
    CheckDuplicatedEmailResponseData,
    CheckDuplicatedEmailRequestData
  >('/shelters/email', data);

export const changeShelterPassword = (data: ChangePasswordRequestData) =>
  axiosInstance.patch<unknown, ChangePasswordRequestData>(
    '/shelters/me/passwords',
    data,
  );
