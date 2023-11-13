import axiosInstance from 'shared/apis/axiosInstance';

export const getSimpleShelterProfile = (shelterId: number) =>
  axiosInstance.get<{
    shelterName: string;
    shelterImageUrl: string;
    shelterAddress: string;
    shelterEmail: string;
  }>(`/shelters/${shelterId}/profile/simple`);

export const getShelterProfileDetail = (shelterId: number) =>
  axiosInstance.get<{
    shelterId: number;
    shelterName: string;
    shelterEmail: string;
    shelterImageUrl: string;
    shelterAddress: string;
    shelterAddressDetail: string;
    shelterPhoneNumber: string;
    shelterSparePhoneNumber: string;
  }>(`/shelters/${shelterId}/profile`);