import axiosInstance from '../axiosInstance';

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

type MyInfoResponse = {
  volunteerId: string;
  volunteerEmail: string;
  volunteerName: string;
  volunteerBirthDate: string;
  volunteerPhoneNumber: string;
  volunteerTemperture: number;
  volunteerCount: number;
  volunteerImageUrl: string;
  volunteerGender: 'FEMAIL' | 'MALE';
};

export const getMyInfo = () =>
  axiosInstance.get<MyInfoResponse>('/volunteers/me');

type PasswordUpdateParams = {
  newPassword: string;
  oldPassword: string;
};

export const updatePassword = (passwordUpdateParams: PasswordUpdateParams) => {
  return axiosInstance.patch<unknown, PasswordUpdateParams>(
    '/volunteers/me/password',
    passwordUpdateParams,
  );
};

type UpdateUserInfoParams = {
  name: string;
  gender: string;
  birthData: string;
  phoneNumber: string;
  imageUrl: string;
};

export const updateUserInfo = (updateUserInfoParams: UpdateUserInfoParams) =>
  axiosInstance.patch<unknown, UpdateUserInfoParams>(
    '/volunteers/me',
    updateUserInfoParams,
  );

type Applicant = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  shelterName: string;
  applicantId: number;
  applicantStatus: string;
  applicantIsWritedReview: boolean;
};

type ApplicantsResponse = {
  applicants: Applicant[];
};

//봉사자가 신청한 봉사 리스트 조회
export const getApplicants = () =>
  axiosInstance.get<ApplicantsResponse>('/volunteers/applicants');

export const checkDuplicatedVolunteerEmail = (email: string) => {
  return axiosInstance.post<{ isDuplicated: boolean }, { email: string }>(
    '/volunteers/email',
    {
      email,
    },
  );
};
