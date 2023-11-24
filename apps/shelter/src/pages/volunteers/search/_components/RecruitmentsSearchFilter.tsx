import { ChangeEvent } from 'react';
import SearchFilters, {
  SearchFilterSelectData,
} from 'shared/components/SearchFilters';
import { PERIOD } from 'shared/constants/period';

import {
  RECRUITMENT_STATUS,
  SEARCH_TYPE,
} from '@/pages/volunteers/search/_constants/filter';
import { SearchFilter } from '@/pages/volunteers/search/_types/filter';

type RecruitmentsSearchFilterProps = {
  searchFilter: Partial<SearchFilter>;
  onChangeFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function RecruitmentsSearchFilter({
  searchFilter,
  onChangeFilter,
}: RecruitmentsSearchFilterProps) {
  const searchFilters: SearchFilterSelectData[] = [
    {
      selectOption: PERIOD,
      name: 'period',
      placeholder: '봉사일',
      value: searchFilter.period,
    },
    {
      selectOption: RECRUITMENT_STATUS,
      name: 'recruitmentStatus',
      placeholder: '모집',
      value: searchFilter.recruitmentStatus,
    },
    {
      selectOption: SEARCH_TYPE,
      name: 'searchType',
      placeholder: '전체',
      value: searchFilter.searchType,
    },
  ];

  return (
    <SearchFilters
      searchFilters={searchFilters}
      onChangeFilter={onChangeFilter}
    />
  );
}
