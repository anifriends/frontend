import axiosInstance from 'shared/apis/axiosInstance';
import type {
  ChangePasswordRequestData,
  CheckDuplicatedEmailRequestData,
  CheckDuplicatedEmailResponseData,
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

export const checkDuplicatedVolunteerEmail = async (
  data: CheckDuplicatedEmailRequestData,
) =>
  await axiosInstance.post<
    CheckDuplicatedEmailResponseData,
    CheckDuplicatedEmailRequestData
  >('/volunteers/email', data);

export const changeVolunteerPassword = async (
  data: ChangePasswordRequestData,
) =>
  await axiosInstance.patch<unknown, ChangePasswordRequestData>(
    '/volunteers/me/passwords',
    data,
  );
