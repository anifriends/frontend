export type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

export type Pagination = {
  pageSize: number;
  pageNumber: number;
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

export type Gender = 'MALE' | 'FEMALE';

export type RecruitementStatus = 'PENDING' | 'REFUSED' | 'APPROVED';

export type RecruitmentApplicantUpdateRequest = {
  status: RecruitementStatus;
};

export type RecruitmentCreateRequest = {
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  capacity: number;
  content: string;
  imageUrls: string[];
};

export type RecruitmentUpdateRequest = {
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  capacity: number;
  content: string;
  imageUrls: string[];
};

export type ShelterRecruitmentApplicant = {
  applicantId: number;
  volunteerId: number;
  volunteerName: string;
  volunteerBirthDate: string;
  volunteerGender: Gender;
  completedVolunteerCount: number;
  volunteerTemperature: number;
  applicantStatus: RecruitementStatus;
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
  volunteerGender: Gender;
  volunteerPhoneNumber: string;
  volunteerAttendance: boolean;
};

export type ApprovedRecruitmentApplicantsResponse = {
  applicants: ApprovedRecruitmentApplicant[];
};

export type AttendanceStatus = {
  applicantId: number;
  attendance: boolean;
};

export type ApplicantsApprovalRequest = {
  applicants: AttendanceStatus[];
};
