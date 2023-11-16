import axiosInstance from 'shared/apis/axiosInstance';
import type {
  checkDuplicatedEmailRequestData,
  checkDuplicatedEmailResponseData,
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

export const checkDuplicatedShelterEmail = async (email: string) =>
  await axiosInstance.post<
    checkDuplicatedEmailResponseData,
    checkDuplicatedEmailRequestData
  >('/shelters/email', {
    email,
  });
