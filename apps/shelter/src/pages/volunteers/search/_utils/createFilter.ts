import { createFormattedTime } from 'shared/utils/date';

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

  const volunteerSearchFilter: VolunteerSearchFilter = {};

  if (startDate || endDate) {
    volunteerSearchFilter.period = `${startDate}~${endDate}`;
  }

  if (isClosed) {
    volunteerSearchFilter.recruitmentStatus =
      isClosed === 'True' ? 'isClosed' : 'isOpen';
  }

  if (title) {
    volunteerSearchFilter.category = 'title';
  }

  if (content) {
    volunteerSearchFilter.category = 'content';
  }

  return volunteerSearchFilter;
};

export const createPeriodSearchFilter = (value: string): SearchFilter => {
  const startDate = new Date();
  const endDate = new Date();

  if (value === PERIOD.WITHIN_ONE_DAY) {
    endDate.setDate(startDate.getDate() + 1);
    return {
      startDate: createFormattedTime(startDate, '-'),
      endDate: createFormattedTime(endDate, '-'),
    };
  }

  if (value === PERIOD.WITHIN_ONE_WEEK) {
    endDate.setDate(startDate.getDate() + 7);
    return {
      startDate: createFormattedTime(startDate, '-'),
      endDate: createFormattedTime(endDate, '-'),
    };
  }

  if (value === PERIOD.WITHIN_ONE_MONTH) {
    endDate.setMonth(startDate.getMonth() + 1);
    return {
      startDate: createFormattedTime(startDate, '-'),
      endDate: createFormattedTime(endDate, '-'),
    };
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
