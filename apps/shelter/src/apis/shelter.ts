import axiosInstance from 'shared/apis/axiosInstance';

import { ShelterInfo } from '@/types/apis/shetler';

type PasswordUpdateParams = {
  newPassword: string;
  oldPassword: string;
};

type PageParams = {
  pageSize: number;
  pageNumber: number;
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

export const getShelterReviewList = (pageParams: PageParams) =>
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
      volunteerImageUrl: string;
    }[];
  }>(`/shelters/me/reviews`, {
    params: pageParams,
  });
