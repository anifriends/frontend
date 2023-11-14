import { ChangeEvent, useEffect, useState } from 'react';

import { RecruitSearchFilter } from '@/apis/recruitment';
import {
  Category,
  RecruitmentStatus,
  VolunteerSearchFilter,
} from '@/pages/volunteers/search/_types/filter';
import {
  createCategorySearchFilter,
  createPeriodSearchFilter,
  createRecruitmentStatusSearchFilter,
  createVolunteerSearchFilter,
} from '@/pages/volunteers/search/_utils/createFilter';

export const useVolunteerSearchFilter = (
  searchFilter: RecruitSearchFilter,
  setSearchFilter: (filter: RecruitSearchFilter) => void,
) => {
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

    setSearchFilter(newFilter);
  };

  const setRecruitmentStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      recruitmentStatus: value as RecruitmentStatus,
    });

    const newFilter = createRecruitmentStatusSearchFilter(value);

    setSearchFilter(newFilter);
  };

  const setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setVolunteerSearchFilter({
      ...volunteerSearchFilter,
      category: value as Category,
    });

    const newFilter = createCategorySearchFilter(value);

    setSearchFilter(newFilter);
  };

  return {
    volunteerSearchFilter,
    setVolunteerSearchFilter: { setPeriod, setRecruitmentStatus, setCategory },
  };
};
