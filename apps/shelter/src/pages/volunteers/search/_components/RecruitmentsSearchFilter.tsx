import { ChangeEvent } from 'react';

import FilterGroup from '@/pages/volunteers/search/_components/FilterGroup';
import FilterSelect from '@/pages/volunteers/search/_components/FilterSelect';
import {
  PERIOD,
  RECRUITMENT_STATUS,
  SEARCH_TYPE,
} from '@/pages/volunteers/search/_constants/filter';
import { VolunteerSearchFilter } from '@/pages/volunteers/search/_types/filter';

type RecruitmentsSearchFilterProps = {
  searchFilter: Partial<VolunteerSearchFilter>;
  onChangeFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function RecruitmentsSearchFilter({
  searchFilter,
  onChangeFilter,
}: RecruitmentsSearchFilterProps) {
  const { period, recruitmentStatus, searchType } = searchFilter;

  return (
    <FilterGroup>
      <FilterSelect
        name="period"
        placeholder="봉사일"
        value={period}
        onChange={onChangeFilter}
      >
        {Object.entries(PERIOD).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect
        name="recruitmentStatus"
        placeholder="모집"
        value={recruitmentStatus}
        onChange={onChangeFilter}
      >
        {Object.entries(RECRUITMENT_STATUS).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect
        name="searchType"
        placeholder="전체"
        value={searchType}
        onChange={onChangeFilter}
      >
        {Object.entries(SEARCH_TYPE).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </FilterSelect>
    </FilterGroup>
  );
}
