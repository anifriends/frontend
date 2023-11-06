import axiosInstance from 'apis/axiosInstance';

export const getShelterProfile = (shelterId: number) =>
  axiosInstance.get<{
    shelterId: number;
    name: string;
    email: string;
    imageUrl: string;
    address: string;
    addressDetail: string;
    phoneNumber: string;
    sparePhoneNumber: string;
  }>(`/volunteers/shelters/${shelterId}/profile`);
