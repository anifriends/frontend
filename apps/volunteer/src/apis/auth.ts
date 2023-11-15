import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import axiosInstance from 'shared/apis/axiosInstance';
import type {
  checkDuplicatedEmailParams,
  checkDuplicatedEmailResponse,
  SigninParams,
  SigninResponse,
} from 'shared/types/apis/auth';
import type { ErrorResponse } from 'shared/types/apis/error';

import { SignupParams } from '@/types/apis/auth';

export const signinVolunteer = async (
  data: SigninParams,
): Promise<AxiosResponse<SigninResponse> | AxiosError<ErrorResponse>> => {
  try {
    const response = await axiosInstance.post<SigninResponse, SigninParams>(
      '/auth/volunteers/login',
      data,
    );

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }

    throw error;
  }
};

export const signupVolunteer = async (
  data: SignupParams,
): Promise<AxiosError<ErrorResponse> | void> => {
  try {
    await axiosInstance.post<unknown, SignupParams>('/volunteers', data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }

    throw error;
  }
};

export const checkDuplicatedVolunteerEmail = async (
  email: string,
): Promise<
  AxiosResponse<checkDuplicatedEmailResponse> | AxiosError<ErrorResponse>
> => {
  try {
    const response = axiosInstance.post<
      checkDuplicatedEmailResponse,
      checkDuplicatedEmailParams
    >('/volunteers/email', {
      email,
    });

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }

    throw error;
  }
};
