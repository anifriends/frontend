import { Period } from '@anifriends/types';

import {
  RECRUITMENT_STATUS,
  SEARCH_TYPE,
} from '@/pages/volunteers/search/_constants/filter';

export type RecruitmentStatus = keyof typeof RECRUITMENT_STATUS;
export type SearchType = keyof typeof SEARCH_TYPE;

export type SearchFilter = {
  keyword: string;
  period: Period;
  recruitmentStatus: RecruitmentStatus;
  searchType: SearchType;
};
