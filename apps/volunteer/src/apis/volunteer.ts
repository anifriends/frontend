import axiosInstance from 'shared/apis/axiosInstance';

type MyInfoResponse = {
  volunteerId: number;
  volunteerEmail: string;
  volunteerName: string;
  volunteerBirthDate: string;
  volunteerPhoneNumber: string;
  volunteerTemperture: number;
  volunteerCount: number;
  volunteerImageUrl: string;
  volunteerGender: 'FEMAIL' | 'MALE';
};

export const getMyVolunteerInfo = () =>
  axiosInstance.get<MyInfoResponse>('/volunteers/me');

type PasswordUpdateParams = {
  newPassword: string;
  oldPassword: string;
};

export const updateVolunteerPassword = (
  passwordUpdateParams: PasswordUpdateParams,
) => {
  return axiosInstance.patch<unknown, PasswordUpdateParams>(
    '/volunteers/me/password',
    passwordUpdateParams,
  );
};

export type UpdateUserInfoParams = {
  name: string;
  gender: 'FEMALE' | 'MALE';
  birthDate: string;
  phoneNumber: string;
  imageUrl: string;
};

export const updateVolunteerUserInfo = (
  updateUserInfoParams: UpdateUserInfoParams,
) =>
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
export const getVolunteerApplicantList = () =>
  axiosInstance.get<ApplicantsResponse>('/volunteers/applicants');

//TODO 봉사자가 작성한 후기 리스트 조회
