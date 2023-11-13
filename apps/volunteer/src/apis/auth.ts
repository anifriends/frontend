import axiosInstance from 'shared/apis/axiosInstance';

export const signInVolunteer = ({
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
  >('/auth/volunteers/login', {
    email,
    password,
  });

type SignUpParams = {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: 'FEMALE' | 'MALE';
};

export const signUpVolunteer = (signUpParams: SignUpParams) =>
  axiosInstance.post<unknown, SignUpParams>('/volunteers', signUpParams);

export const checkDuplicatedVolunteerEmail = (email: string) => {
  return axiosInstance.post<{ isDuplicated: boolean }, { email: string }>(
    '/volunteers/email',
    {
      email,
    },
  );
};
