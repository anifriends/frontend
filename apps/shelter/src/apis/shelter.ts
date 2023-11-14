import axiosInstance from 'shared/apis/axiosInstance';

import { ShelterInfo } from '@/types/apis/shetler';

type PasswordUpdateParams = {
  newPassword: string;
  oldPassword: string;
};

export const getShelterInfoAPI = () =>
  axiosInstance.get<ShelterInfo>('/shelters/me');

export const updateShelterInfo = (shelterInfo: ShelterInfo) =>
  axiosInstance.patch<unknown, ShelterInfo>('/shelters/me', shelterInfo);

export const updatePassword = (passwordUpdateParams: PasswordUpdateParams) =>
  axiosInstance.patch<unknown, PasswordUpdateParams>(
    '/shelters/me/password',
    passwordUpdateParams,
  );

export const updateAddressStatusAPI = (isOpenedAddress: boolean) =>
  axiosInstance.patch<
    unknown,
    {
      isOpenedAddress: boolean;
    }
  >('/shelters/me/address/status', { isOpenedAddress });

export const getShelterReviewList = (
  shelterId: number,
  pageNumber: number,
  pageSize: number,
) =>
  axiosInstance.get<{
    pageInfo: {
      totalElements: number;
      hasNext: boolean;
    };
    reviews: {
      reviewId: number;
      reviewCreatedAt: string;
      reviewContent: string;
      reviewImageUrls: string[];
      volunteerName: string;
      volunteerTemperature: number;
      volunteerReviewCount: number;
      volunteerImageUrl: number;
    }[];
  }>(`/shelters/${shelterId}/reviews`, {
    params: {
      pageSize,
      pageNumber,
    },
  });
