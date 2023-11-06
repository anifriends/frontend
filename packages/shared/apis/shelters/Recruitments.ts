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
  deadLine: string;
  isClosed: boolean;
  applicantCount: number;
  capacity: number;
};

type RecruitSearchParams = {
  keyword: string;
  startDate: string;
  endDate: string;
  content: boolean;
  title: boolean;
  pageSize: number;
  pageNumber: number;
};

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
};

export const getRecruitmentDetail = (recruitmentId: number) =>
  axiosInstance.get<RecruitmentDetailResponse>(
    `shelters/recruitments/${recruitmentId}`,
  );

type RecruitmentParams = {
  title: string;
  startTime: string;
  EndTime: string;
  deadline: string;
  capacity: number;
  content: string;
  imageUrl: string[];
};

export const createRecruitment = (recruitmentParams: RecruitmentParams) => {
  return axiosInstance.post<unknown, RecruitmentParams>(
    `/recruitments`,
    recruitmentParams,
  );
};

export const updateRecruitment = (
  recruitmentId: number,
  recruitmentParams: RecruitmentParams,
) => {
  return axiosInstance.post<unknown, RecruitmentParams>(
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
      gender: string;
      volunteerCount: number;
      temperature: number;
      status: string;
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
      status: string;
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
      gender: string;
      phoneNumber: string;
      attendance: boolean;
    }[];
  }>(`/recruitments/${recruitmentId}/approval`);
};

type ApplicantStatus = {
  applicantId: number;
  attendance: boolean;
};

export const updateApplicantsApproval = (
  recruitmentId: number,
  applicants: ApplicantStatus[],
) => {
  return axiosInstance.patch<
    unknown,
    {
      applicants: ApplicantStatus[];
    }
  >(`/recruitments/${recruitmentId}/approval`, {
    applicants,
  });
};
