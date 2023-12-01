import { PersonGenderEng } from 'shared/types/gender';

import { applicantStatusEng as RecruitmentApplicantStatus } from '../recruitment';

export type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

export type Pagination = {
  page: number;
  size: number;
};

export type Recruitment = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  recruitmentEndTime: string;
  recruitmentDeadline: string;
  recruitmentIsClosed: boolean;
  recruitmentApplicantCount: number;
  recruitmentCapacity: number;
};

export type RecruitementsResponse = {
  pageInfo: PageInfo;
  recruitments: Recruitment[];
};

export type RecruitmentSearchFilter = {
  keyword: string;
  startDate: string;
  endDate: string;
  closedFilter: 'IS_CLOSED' | 'IS_OPENED';
  keywordFilter: 'IS_TITLE' | 'IS_CONTENT';
};

export type RecruitmentsRequest = Partial<RecruitmentSearchFilter> & Pagination;

export type RecruitmentApplicantUpdateRequest = {
  isApproved: boolean;
};

export type RecruitmentCreateRequest = {
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  capacity: number;
  content?: string;
  imageUrls?: string[];
};

export type RecruitmentUpdateRequest = {
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  capacity: number;
  content?: string;
  imageUrls?: string[];
};

export type ShelterRecruitmentApplicant = {
  applicantId: number;
  volunteerId: number;
  volunteerName: string;
  volunteerBirthDate: string;
  volunteerGender: PersonGenderEng;
  completedVolunteerCount: number;
  volunteerTemperature: number;
  applicantStatus: RecruitmentApplicantStatus;
};

export type RecruitmentApplicantsResponse = {
  applicants: ShelterRecruitmentApplicant[];
  recruitmentCapacity: number;
};

export type ApprovedRecruitmentApplicant = {
  volunteerId: number;
  applicantId: number;
  volunteerName: string;
  volunteerBirthDate: string;
  volunteerGender: PersonGenderEng;
  volunteerPhoneNumber: string;
  volunteerAttendance: boolean;
};

export type ApprovedRecruitmentApplicantsResponse = {
  applicants: ApprovedRecruitmentApplicant[];
};

export type AttendanceStatus = {
  applicantId: number;
  isAttended: boolean;
};

export type ApplicantsApprovalRequest = {
  applicants: AttendanceStatus[];
};
