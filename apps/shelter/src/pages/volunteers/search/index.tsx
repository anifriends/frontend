import { Box } from '@chakra-ui/react';

import RecruitItem from '@/pages/volunteers/_components/RecruitItem';
import FilterGroup from '@/pages/volunteers/search/_components/FilterGroup';
import FilterSelect from '@/pages/volunteers/search/_components/FilterSelect';
import {
  PERIOD,
  RECRUITMENT_STATUS,
  SEARCH_TYPE,
} from '@/pages/volunteers/search/_constants/filter';
import { useVolunteerSearch } from '@/pages/volunteers/search/_hooks/useVolunteerSearch';

const DUMMY_RECRUITMENT = {
  recruitmentId: 1,
  recruitmentTitle: '봉사자를 모집합니다',
  recruitmentStartTime: '2021-11-08T11:44:30.327959',
  recruitmentEndTime: '2021-11-08T11:44:30.327959',
  recruitmentDeadline: '2021-11-08T11:44:30.327959',
  recruitmentIsClosed: false,
  recruitmentApplicantCount: 15,
  recruitmentCapacity: 15,
};

export default function VolunteersSearchPage() {
  const { isKeywordSearched, searchFilter, handleChangeSearchFilter } =
    useVolunteerSearch();
  const { period, recruitmentStatus, searchType } = searchFilter;

  // TODO: msw API 호출
  const recruitmentList = Array.from({ length: 10 }, (_, index) => {
    return { recruitmentId: index, DUMMY_RECRUITMENT };
  });

  if (!isKeywordSearched) {
    return null;
  }

  return (
    <Box>
      <FilterGroup>
        <FilterSelect
          name="period"
          placeholder="봉사일"
          value={period}
          onChange={handleChangeSearchFilter}
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
          onChange={handleChangeSearchFilter}
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
          onChange={handleChangeSearchFilter}
        >
          {Object.entries(SEARCH_TYPE).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>
      {recruitmentList?.map((recruitmentItem: any) => (
        <RecruitItem key={recruitmentItem.recruitmentId} {...recruitmentItem} />
      ))}
    </Box>
  );
}
