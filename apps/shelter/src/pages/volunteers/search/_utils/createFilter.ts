import {
  CATEGORY,
  PERIOD,
  RECRUITMENT_STATUS,
} from '@/pages/volunteers/search/_constants/filter';
import {
  SearchFilter,
  VolunteerSearchFilter,
} from '@/pages/volunteers/search/_types/filter';

export const createVolunteerSearchFilter = (
  filter: SearchFilter,
): VolunteerSearchFilter => {
  const { startDate, endDate, isClosed, title, content } = filter;
  if (startDate || endDate) {
    return { period: `${startDate}~${endDate}` };
  }

  if (isClosed) {
    return { recruitmentStatus: isClosed === 'True' ? 'isClosed' : 'isOpen' };
  }

  if (title) {
    return { category: 'title' };
  }

  if (content) {
    return { category: 'content' };
  }

  return {};
};

export const createPeriodSearchFilter = (value: string): SearchFilter => {
  if (value === PERIOD.PREVIOUS_DAY) {
    return { startDate: '2023.03.11', endDate: '2023.03.23' };
  }

  if (value === PERIOD.PREVIOUS_WEEK) {
    return { startDate: '2023.03.11', endDate: '2023.03.23' };
  }

  if (value === PERIOD.PREVIOUS_MONTH) {
    return { startDate: '2023.03.11', endDate: '2023.03.23' };
  }

  return { startDate: undefined, endDate: undefined };
};

export const createRecruitmentStatusSearchFilter = (
  value: string,
): SearchFilter => {
  if (value === RECRUITMENT_STATUS.IS_CLOSED) {
    return { isClosed: String(true) };
  }

  if (value === RECRUITMENT_STATUS.IS_OPEN) {
    return { isClosed: String(false) };
  }

  return { isClosed: undefined };
};

export const createCategorySearchFilter = (value: string): SearchFilter => {
  if (value === CATEGORY.TITLE) {
    return { title: String(true), content: undefined };
  }

  if (value === CATEGORY.CONTENT) {
    return { title: undefined, content: String(true) };
  }

  return { title: undefined, content: undefined };
};
