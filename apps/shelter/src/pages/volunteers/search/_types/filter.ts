import {
  CATEGORY,
  RECRUITMENT_STATUS,
} from '@/pages/volunteers/search/_constants/filter';

export type SearchFilter = Partial<{
  keyword: string;
  startDate: string;
  endDate: string;
  isClosed: string;
  content: string;
  title: string;
}>;

export type RecruitmentStatus =
  (typeof RECRUITMENT_STATUS)[keyof typeof RECRUITMENT_STATUS];

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

export type VolunteerSearchFilter = Partial<{
  period: string;
  recruitmentStatus: RecruitmentStatus;
  category: Category;
}>;
