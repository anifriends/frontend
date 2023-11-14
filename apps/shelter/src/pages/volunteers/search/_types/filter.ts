import {
  CATEGORY,
  RECRUITMENT_STATUS,
} from '@/pages/volunteers/search/_constants/filter';

export type RecruitmentStatus =
  (typeof RECRUITMENT_STATUS)[keyof typeof RECRUITMENT_STATUS];

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

export type VolunteerSearchFilter = Partial<{
  period: string;
  recruitmentStatus: RecruitmentStatus;
  category: Category;
}>;
