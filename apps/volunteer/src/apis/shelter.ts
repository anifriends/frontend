import axiosInstance from 'shared/apis/axiosInstance';

export type SimpleShelterProfile = {
  shelterName: string;
  shelterImageUrl: string;
  shelterAddress: string;
  shelterEmail: string;
};

export type ShelterProfile = {
  shelterId: number;
  shelterAddressDetail: string;
  shelterPhoneNumber: string;
  shelterSparePhoneNumber: string;
} & SimpleShelterProfile;

export const getSimpleShelterProfile = (shelterId: number) =>
  axiosInstance.get<SimpleShelterProfile>(
    `/shelters/${shelterId}/profile/simple`,
  );

export const getShelterProfileDetail = (shelterId: number) =>
  axiosInstance.get<ShelterProfile>(`/shelters/${shelterId}/profile`);
