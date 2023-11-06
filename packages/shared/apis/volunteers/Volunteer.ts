import axiosInstance from 'apis/axiosInstance';

//TODO 회원가입
export const signUp = () => {};

type MyInfoResponse = {
  email: string;
  name: string;
  birthDate: Date;
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
  startTime: Date;
  endTime: Date;
  isClosed: false;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
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
  volunteerDate: Date;
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
