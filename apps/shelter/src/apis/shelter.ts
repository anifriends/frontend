import axiosInstance from 'shared/apis/axiosInstance';

type ShelterInfo = {
  name: string;
  imageUrl: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  isOpenedAddress: boolean;
};

type PasswordUpdateParams = {
  newPassword: string;
  oldPassword: string;
};

export const getShelterInfo = () =>
  axiosInstance.get<{
    shelterId: number;
    shelterName: string;
    shelterImageUrl: string;
    shelterAddress: string;
    shelterAddressDetail: string;
    shelterPhoneNumber: string;
    shelterSparePhoneNumber: string;
    shelterIsOpenedAddress: boolean;
  }>('/shelters/me');

export const updateShelterInfo = (shelterInfo: ShelterInfo) =>
  axiosInstance.patch<unknown, ShelterInfo>('/shelters/me', shelterInfo);

export const updatePassword = (passwordUpdateParams: PasswordUpdateParams) =>
  axiosInstance.patch<unknown, PasswordUpdateParams>(
    '/shelters/me/password',
    passwordUpdateParams,
  );

export const updateAddressStatus = (isOpenedAddress: boolean) =>
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
