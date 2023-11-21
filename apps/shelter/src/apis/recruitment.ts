import axiosInstance from 'shared/apis/axiosInstance';

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type Recruitment = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  recruitmentEndTime: string;
  recruitmentDeadline: string;
  recruitmentIsClosed: boolean;
  recruitmentApplicantCount: number;
  recruitmentCapacity: number;
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

type PostRecruitmentParams = {
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  capacity: number;
  content: string;
  imageUrls: string[];
};

export type AttendanceStatus = {
  applicantId: number;
  isAttended: boolean;
};

type Gender = 'MALE' | 'FEMALE';
type RecruitementStatus = 'PENDING' | 'REFUSED' | 'APPROVED';

export const getShelterRecruitments = async (
  recruitSearchParams: Partial<RecruitSearchParams>,
) =>
  axiosInstance.get<
    {
      pageInfo: PageInfo;
      recruitments: Recruitment[];
    },
    RecruitSearchParams
  >('/shelters/recruitments', {
    params: recruitSearchParams,
  });

export const createShelterRecruitment = (
  recruitmentParams: PostRecruitmentParams,
) =>
  axiosInstance.post<unknown, PostRecruitmentParams>(
    `/shelters/recruitments`,
    recruitmentParams,
  );

export const updateShelterRecruitment = (
  recruitmentId: number,
  recruitmentParams: PostRecruitmentParams,
) =>
  axiosInstance.patch<unknown, PostRecruitmentParams>(
    `/shelters/recruitments/${recruitmentId}`,
    recruitmentParams,
  );

export const deleteShelterRecruitment = (recruitmentId: number) =>
  axiosInstance.delete<unknown, unknown>(
    `/shelters/recruitments/${recruitmentId}`,
  );

export const closeShelterRecruitment = (recruitmentId: number) =>
  axiosInstance.patch<unknown, unknown>(
    `/shelters/recruitments/${recruitmentId}/close`,
  );

export const getShelterRecruitmentApplicants = (recruitmentId: number) =>
  axiosInstance.get<{
    applicants: {
      applicantId: number;
      volunteerId: number;
      volunteerName: string;
      volunteerBirthDate: string;
      volunteerGender: Gender;
      completedVolunteerCount: number;
      volunteerTemperature: number;
      applicantStatus: RecruitementStatus;
    }[];
    recruitmentCapacity: number;
  }>(`/shelters/recruitments/${recruitmentId}/applicants`);

export const updateShelterRecruitmentApplicant = (
  recruitmentId: number,
  applicantId: number,
) =>
  axiosInstance.patch<
    unknown,
    {
      status: RecruitementStatus;
    }
  >(`/shelters/recruitments/${recruitmentId}/applicants/${applicantId}`);

export const getShelterApprovedRecruitmentApplicants = (
  recruitmentId: number,
) =>
  axiosInstance.get<{
    applicants: {
      volunteerId: number;
      applicantId: number;
      volunteerName: string;
      volunteerBirthDate: string;
      volunteerGender: Gender;
      volunteerPhoneNumber: string;
      volunteerAttendance: boolean;
    }[];
  }>(`/shelters/recruitments/${recruitmentId}/approval`);

export const updateAttendanceAPI = (
  recruitmentId: number,
  applicants: AttendanceStatus[],
) =>
  axiosInstance.patch<
    unknown,
    {
      applicants: AttendanceStatus[];
    }
  >(`/shelters/recruitments/${recruitmentId}/approval`, {
    applicants,
  });
