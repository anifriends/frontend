import {
  APPLICANT_STATUS_ENG,
  APPLICANT_STATUS_KOR,
} from '@/constants/recruitment';

export type applicantStatusEng =
  (typeof APPLICANT_STATUS_ENG)[keyof typeof APPLICANT_STATUS_ENG];

export type applicantStatusKor =
  (typeof APPLICANT_STATUS_KOR)[keyof typeof APPLICANT_STATUS_KOR];
