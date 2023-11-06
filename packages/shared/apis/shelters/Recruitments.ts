import axiosInstance from 'apis/axiosInstance';

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type Recruitment = {
  recruitmentId: number;
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  isClosed: boolean;
  applicantCount: number;
  capacity: number;
};

type RecruitSearchParams = {
  keyword: string;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  content: boolean;
  title: boolean;
  pageSize: number;
  pageNumber: number;
};

type RecruitmentDetailResponse = {
  title: string;
  applicantCount: number;
  capacity: number;
  content: string;
  startTime: string;
  endTime: string;
  isClosed: boolean;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
};

type PostRecruitmentParams = {
  title: string;
  startTime: string;
  EndTime: string;
  deadline: string;
  capacity: number;
  content: string;
  imageUrls: string[];
};

type AttendanceStatus = {
  applicantId: number;
  attendance: boolean;
};

type Gender = 'MALE' | 'FEMALE';
type ApplicantStatus = 'PENDING' | 'REFUSED' | 'APPROVED';

export const getRecruitments = (recruitSearchParams: RecruitSearchParams) =>
  axiosInstance.get<
    {
      pageInfo: PageInfo;
      recruitments: Recruitment[];
    },
    RecruitSearchParams
  >('shelters/recruitments', {
    params: recruitSearchParams,
  });

export const getRecruitmentDetail = (recruitmentId: number) =>
  axiosInstance.get<RecruitmentDetailResponse>(
    `shelters/recruitments/${recruitmentId}`,
  );

export const createRecruitment = (recruitmentParams: PostRecruitmentParams) => {
  return axiosInstance.post<unknown, PostRecruitmentParams>(
    `/recruitments`,
    recruitmentParams,
  );
};

export const updateRecruitment = (
  recruitmentId: number,
  recruitmentParams: PostRecruitmentParams,
) => {
  return axiosInstance.patch<unknown, PostRecruitmentParams>(
    `/recruitments/${recruitmentId}`,
    recruitmentParams,
  );
};

export const deleteRecruitment = (recruitmentId: number) => {
  return axiosInstance.delete<unknown, unknown>(
    `/recruitments/${recruitmentId}`,
  );
};

export const closeRecruitment = (recruitmentId: number) => {
  return axiosInstance.patch<unknown, unknown>(
    `/recruitments/${recruitmentId}/close`,
  );
};

export const getRecruitmentApplicants = (recruitmentId: number) => {
  return axiosInstance.get<{
    applicants: {
      applicantId: number;
      volunteerId: number;
      name: string;
      birthDate: string;
      gender: Gender;
      volunteerCount: number;
      temperature: number;
      status: ApplicantStatus;
    }[];
    capacity: number;
  }>(`/recruitments/${recruitmentId}/applicants`);
};

export const updateRecruitmentApplicant = (
  recruitmentId: number,
  applicantId: number,
) => {
  return axiosInstance.patch<
    unknown,
    {
      status: ApplicantStatus;
    }
  >(`/recruitments/${recruitmentId}/applicants/${applicantId}`);
};

export const getApprovedRecruitmentApplicants = (recruitmentId: number) => {
  return axiosInstance.get<{
    applicants: {
      volunteerId: number;
      applicantId: number;
      name: string;
      birthDate: string;
      gender: Gender;
      phoneNumber: string;
      attendance: boolean;
    }[];
  }>(`/recruitments/${recruitmentId}/approval`);
};

export const updateApplicantsApproval = (
  recruitmentId: number,
  applicants: AttendanceStatus[],
) => {
  return axiosInstance.patch<
    unknown,
    {
      applicants: AttendanceStatus[];
    }
  >(`/recruitments/${recruitmentId}/approval`, {
    applicants,
  });
};
