import axiosInstance from 'shared/apis/axiosInstance';
import type {
  checkDuplicatedEmailRequestData,
  checkDuplicatedEmailResponseData,
  SigninRequestData,
  SigninResponseData,
} from 'shared/types/apis/auth';

import { SignupRequestData } from '@/types/apis/auth';

export const signinVolunteer = async (data: SigninRequestData) =>
  await axiosInstance.post<SigninResponseData, SigninRequestData>(
    '/auth/volunteers/login',
    data,
  );

export const signupVolunteer = async (data: SignupRequestData) =>
  await axiosInstance.post<unknown, SigninRequestData>('/volunteers', data);

export const checkDuplicatedVolunteerEmail = async (email: string) =>
  await axiosInstance.post<
    checkDuplicatedEmailResponseData,
    checkDuplicatedEmailRequestData
  >('/volunteers/email', {
    email,
  });
