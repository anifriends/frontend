import { APPLICANT_STATUS } from '@/constants/applicantStatus';

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

export type PagenationRequestParams = {
  page: number;
  size: number;
};

export type ApplicantStatus = keyof typeof APPLICANT_STATUS;

export type Applicant = {
  shelterId: number;
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  shelterName: string;
  applicantId: number;
  applicantStatus: ApplicantStatus;
  applicantIsWritedReview: boolean;
};

export type VolunteerApplicantsResponseData = {
  pageInfo: PageInfo;
  applicants: Applicant[];
};
