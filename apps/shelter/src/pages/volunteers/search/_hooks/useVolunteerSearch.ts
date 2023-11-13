import { ChangeEvent, useEffect, useState } from 'react';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

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

export const useVolunteerSearch = () => {
  const searchAPI = (filter: SearchFilter) => {
    console.log('filter', filter);
  };

  const [filter, setFilterValue] = useSearchFilter<SearchFilter>(searchAPI);
  const [volunteerSearchFilter, setVolunteerSearchFilter] =
    useState<VolunteerSearchFilter>({} as VolunteerSearchFilter);

  const [setOnSearch, setKeyword] = useSearchHeaderStore((state) => [
    state.setOnSearch,
    state.setKeyword,
  ]);

  useEffect(() => {
    setOnSearch((keyword) => setFilterValue({ keyword }));

    return () => {
      setKeyword('');
      setOnSearch(() => {});
    };
  }, []);

  useEffect(() => {
    const newVolunteerSearchFilter = createVolunteerSearchFilter(filter);

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      ...newVolunteerSearchFilter,
    });
  }, [filter]);

  const setPeriod = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      period: value,
    });

    const newFilter = createPeriodSearchFilter(value);

    setFilterValue({ ...filter, ...newFilter });
  };

  const setRecruitmentStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      recruitmentStatus: value as RecruitmentStatus,
    });

    const newFilter = createRecruitmentStatusSearchFilter(value);

    setFilterValue({ ...filter, ...newFilter });
  };

  const setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      category: value as Category,
    });

    const newFilter = createCategorySearchFilter(value);

    setFilterValue({ ...filter, ...newFilter });
  };

  return {
    isSearched: Boolean(filter.keyword),
    volunteerSearchFilter,
    setPeriod,
    setRecruitmentStatus,
    setCategory,
  };
};
