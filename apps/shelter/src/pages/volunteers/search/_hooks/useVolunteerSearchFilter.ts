import { ChangeEvent, useEffect, useState } from 'react';

import { useSearchFilter } from '@/pages/volunteers/search/_hooks/useSearchFilter';
import {
  Category,
  RecruitmentStatus,
  SearchFilter,
  VolunteerSearchFilter,
} from '@/pages/volunteers/search/_types/filter';
import {
  createCategorySearchFilter,
  createPeriodSearchFilter,
  createRecruitmentStatusSearchFilter,
  createVolunteerSearchFilter,
} from '@/pages/volunteers/search/_utils/createFilter';

export const useVolunteerSearchFilter = (searchAPI: () => void) => {
  const search = (filter: SearchFilter) => {
    console.log('filter', filter);
    // TODO: filter 를 통해 request 객체 가공하기
    // request = createSearchRequest(filter);
    // searchAPI(request);
    searchAPI();
  };

  const [searchFilter, setSearchFilter] = useSearchFilter<SearchFilter>(search);

  const [volunteerSearchFilter, setVolunteerSearchFilter] =
    useState<VolunteerSearchFilter>({} as VolunteerSearchFilter);

  useEffect(() => {
    const newVolunteerSearchFilter = createVolunteerSearchFilter(searchFilter);

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      ...newVolunteerSearchFilter,
    });
  }, [searchFilter]);

  const setPeriod = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      period: value,
    });

    const newFilter = createPeriodSearchFilter(value);

    setSearchFilter({ ...searchFilter, ...newFilter });
  };

  const setRecruitmentStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      recruitmentStatus: value as RecruitmentStatus,
    });

    const newFilter = createRecruitmentStatusSearchFilter(value);

    setSearchFilter({ ...searchFilter, ...newFilter });
  };

  const setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      category: value as Category,
    });

    const newFilter = createCategorySearchFilter(value);

    setSearchFilter({ ...searchFilter, ...newFilter });
  };

  const setKeywordFilter = (keyword: string) => {
    setSearchFilter({ ...searchFilter, keyword });
  };

  return {
    isSearched: Boolean(searchFilter.keyword),
    setKeywordFilter,
    volunteerSearchFilter,
    setVolunteerSearchFilter: { setPeriod, setRecruitmentStatus, setCategory },
  };
};
