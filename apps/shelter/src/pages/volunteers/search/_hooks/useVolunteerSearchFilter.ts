import { ChangeEvent, useEffect, useState } from 'react';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

import { useSearchFilter } from '@/pages/volunteers/search/_hooks/useSearchFilter';

type Filter = Partial<{
  keyword: string;
  startDate: string;
  endDate: string;
  isClosed: string;
  content: string;
  title: string;
}>;

export const PERIOD = {
  PREVIOUS_DAY: 'previousDay',
  PREVIOUS_WEEK: 'previousWeek',
  PREVIOUS_MONTH: 'previousMonth',
  CUSTOM_PERIOD: 'customPeriod',
} as const;

type Period = (typeof PERIOD)[keyof typeof PERIOD];

export const RECRUITMENT_STATUS = {
  IS_OPEN: 'isOpen',
  IS_CLOSED: 'isClosed',
} as const;

type RecruitmentStatus =
  (typeof RECRUITMENT_STATUS)[keyof typeof RECRUITMENT_STATUS];

export const CATEGORY = {
  TITLE: 'title',
  CONTENT: 'content',
} as const;

type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

type VolunteerSearchFilter = {
  period: Period;
  recruitmentStatus: RecruitmentStatus;
  category: Category;
};

export const useVolunteerSearchFilter = () => {
  const setOnSearch = useSearchHeaderStore((state) => state.setOnSearch);

  const searchAPI = (filter: Filter) => {
    console.log('filter', filter);
  };

  const { filter, setFilterValue } = useSearchFilter<Filter>(searchAPI);

  const [volunteerSearchFilter, setVolunteerSearchFilter] =
    useState<VolunteerSearchFilter>({} as VolunteerSearchFilter);

  useEffect(() => {
    setOnSearch((keyword) => setFilterValue({ keyword }));

    return () => {
      setOnSearch(() => {});
    };
  }, []);

  const setPeriod = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      period: value as Period,
    });

    if (value === PERIOD.PREVIOUS_DAY) {
      return setFilterValue({
        ...filter,
        startDate: '2023.03.11',
        endDate: '2023.03.23',
      });
    }

    if (value === PERIOD.PREVIOUS_WEEK) {
      return setFilterValue({
        ...filter,
        startDate: '2023.03.11',
        endDate: '2023.03.23',
      });
    }

    if (value === PERIOD.PREVIOUS_MONTH) {
      return setFilterValue({
        ...filter,
        startDate: '2023.03.11',
        endDate: '2023.03.23',
      });
    }

    if (value === PERIOD.CUSTOM_PERIOD) {
      // TODO: 기간 입력 받는 기능 추가
      return;
    }

    setFilterValue({
      ...filter,
      startDate: undefined,
      endDate: undefined,
    });
  };

  const setRecruitmentStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      recruitmentStatus: value as RecruitmentStatus,
    });

    if (value === RECRUITMENT_STATUS.IS_CLOSED) {
      return setFilterValue({
        ...filter,
        isClosed: String(true),
      });
    }

    if (value === RECRUITMENT_STATUS.IS_OPEN) {
      return setFilterValue({
        ...filter,
        isClosed: String(false),
      });
    }

    setFilterValue({
      ...filter,
      isClosed: undefined,
    });
  };

  const setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      category: value as Category,
    });

    if (value === CATEGORY.TITLE) {
      return setFilterValue({
        ...filter,
        title: String(true),
        content: undefined,
      });
    }

    if (value === CATEGORY.CONTENT) {
      return setFilterValue({
        ...filter,
        title: undefined,
        content: String(true),
      });
    }

    setFilterValue({
      ...filter,
      title: undefined,
      content: undefined,
    });
  };

  return {
    isSearched: Boolean(filter.keyword),
    volunteerSearchFilter,
    setPeriod,
    setRecruitmentStatus,
    setCategory,
  };
};
