import axiosInstance from 'apis/axiosInstance';

type SignUpParams = {
  email: string;
  password: string;
  name: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  isOpenedAddress: boolean;
};

export const signUpShelter = (signUpParams: SignUpParams) => {
  return axiosInstance.post<unknown, SignUpParams>('/shelters', signUpParams);
};

type ShelterInfo = {
  name: string;
  imageUrl: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  isOpenedAddress: boolean;
};

export const updateShelterInfo = (shelterInfo: ShelterInfo) => {
  return axiosInstance.patch<unknown, ShelterInfo>('/shelters/me', shelterInfo);
};

export const getShelterInfo = () => {
  return axiosInstance.get<{
    shelterId: number;
    name: string;
    imageUrl: string;
    address: string;
    addressDetail: string;
    phoneNumber: string;
    sparePhoneNumber: string;
    isOpenedAddress: boolean;
  }>('/shelters/me');
};

type PasswordUpdateParams = {
  newPassword: string;
  oldPassword: string;
};

export const updatePassword = (passwordUpdateParams: PasswordUpdateParams) => {
  return axiosInstance.patch<unknown, PasswordUpdateParams>(
    '/shelters/me/password',
    passwordUpdateParams,
  );
};

export const updateAddressStatus = (isOpenedAddress: boolean) => {
  return axiosInstance.patch<
    unknown,
    {
      isOpenedAddress: boolean;
    }
  >('/shelters/me/address/status', { isOpenedAddress });
};
