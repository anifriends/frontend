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

export const signinShelter = async (
  data: SigninParams,
): Promise<AxiosResponse<SigninResponse> | AxiosError<ErrorResponse>> => {
  try {
    const response = await axiosInstance.post<SigninResponse, SigninParams>(
      '/auth/shelters/login',
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

export const signupShelter = async (
  data: SignupParams,
): Promise<AxiosError<ErrorResponse> | void> => {
  try {
    await axiosInstance.post<unknown, SignupParams>('/shelters', data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }

    throw error;
  }
};

export const checkDuplicatedShelterEmail = async (
  email: string,
): Promise<
  AxiosResponse<checkDuplicatedEmailResponse> | AxiosError<ErrorResponse>
> => {
  try {
    const response = axiosInstance.post<
      checkDuplicatedEmailResponse,
      checkDuplicatedEmailParams
    >('/shelters/email', {
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
