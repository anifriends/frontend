import axiosInstance from 'shared/apis/axiosInstance';

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

export const signInShelter = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  axiosInstance.post<
    {
      accessToken: string;
      userId: number;
      role: string;
    },
    {
      email: string;
      password: string;
    }
  >('/auth/shelters/login', {
    email,
    password,
  });

export const checkDuplicatedShelterEmail = (email: string) => {
  return axiosInstance.post<{ isDuplicated: boolean }, { email: string }>(
    '/shelters/email',
    {
      email,
    },
  );
};
