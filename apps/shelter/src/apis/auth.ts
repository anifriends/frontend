import axiosInstance from 'shared/apis/axiosInstance';
import type {
  ChangePasswordRequestData,
  CheckDuplicatedEmailRequestData,
  CheckDuplicatedEmailResponseData,
  SigninRequestData,
  SigninResponseData,
} from 'shared/types/apis/auth';

import { SignupRequestData } from '@/types/apis/auth';

export const signinShelter = async (data: SigninRequestData) =>
  await axiosInstance.post<SigninResponseData, SigninRequestData>(
    '/auth/shelters/login',
    data,
  );

export const signupShelter = async (data: SignupRequestData) =>
  await axiosInstance.post<unknown, SignupRequestData>('/shelters', data);

export const checkDuplicatedShelterEmail = async (
  data: CheckDuplicatedEmailRequestData,
) =>
  await axiosInstance.post<
    CheckDuplicatedEmailResponseData,
    CheckDuplicatedEmailRequestData
  >('/shelters/email', data);

export const changeShelterPassword = async (data: ChangePasswordRequestData) =>
  await axiosInstance.patch<unknown, ChangePasswordRequestData>(
    '/shelters/me/passwords',
    data,
  );
