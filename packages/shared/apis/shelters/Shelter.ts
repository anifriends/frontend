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

export const signUpShelter = (signUpParams: SignUpParams) =>
  axiosInstance.post<unknown, SignUpParams>('/shelters', signUpParams);

type ShelterInfo = {
  name: string;
  imageUrl: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  isOpenedAddress: boolean;
};

export const updateShelterInfo = (shelterInfo: ShelterInfo) =>
  axiosInstance.patch<unknown, ShelterInfo>('/shelters/me', shelterInfo);

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

export const checkDuplicatedShelterEmail = (email: string) => {
  return axiosInstance.post<{ isDuplicated: boolean }, { email: string }>(
    '/shelters/emails',
    {
      email,
    },
  );
};
