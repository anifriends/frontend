import axiosInstance from 'apis/axiosInstance';

//TODO 회원가입

type SignUpParams = {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: 'FEMALE' | 'MALE';
};

export const signUpVolunteer = (signUpParams: SignUpParams) => {
  return axiosInstance.post<unknown, SignUpParams>('/volunteers', signUpParams);
};

type MyInfoResponse = {
  email: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  temperture: number;
  volunteerCount: number;
  imageUrl: string;
};

export const getMyInfo = () =>
  axiosInstance.get<MyInfoResponse>('/volunteers/me');

type RecruitmentDetailResponse = {
  title: string;
  applicantCount: number;
  capacity: number;
  content: string;
  startTime: string;
  endTime: string;
  isClosed: false;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
  shelterInfo: {
    shelterName: string;
    imageUrl: string;
    email: string;
    address: string;
  };
};

export const getRecruitmentDetail = (recruitmentId: number) =>
  axiosInstance.get<RecruitmentDetailResponse>(
    `/volunteers/recruitments/${recruitmentId}`,
  );

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
  applicantId: number;
  title: string;
  volunteerDate: string;
  shelterName: string;
  status: string;
  isWritedReview: boolean;
};

type ApplicantsResponse = {
  findApplyingVolunteerResponses: Applicant[];
};

//봉사자가 신청한 봉사 리스트 조회
export const getApplicants = () =>
  axiosInstance.get<ApplicantsResponse>('/volunteers/applicants');
