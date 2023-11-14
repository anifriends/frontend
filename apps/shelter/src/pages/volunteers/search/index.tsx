import { Box } from '@chakra-ui/react';

import RecruitItem from '@/pages/volunteers/_components/RecruitItem';
import FilterGroup from '@/pages/volunteers/search/_components/FilterGroup';
import FilterSelect from '@/pages/volunteers/search/_components/FilterSelect';
import {
  CATEGORY,
  PERIOD,
  RECRUITMENT_STATUS,
} from '@/pages/volunteers/search/_constants/filter';
import { useVolunteerSearch } from '@/pages/volunteers/search/_hooks/useVolunteerSearch';

export default function VolunteersSearchPage() {
  const {
    isSearched,
    recruitmentList,
    volunteerSearchFilter,
    setVolunteerSearchFilter,
  } = useVolunteerSearch();

  const { period, recruitmentStatus, category } = volunteerSearchFilter;
  const { setPeriod, setRecruitmentStatus, setCategory } =
    setVolunteerSearchFilter;

  if (!isSearched) {
    return null;
  }

  return (
    <Box>
      <FilterGroup>
        <FilterSelect
          name="period"
          placeholder="봉사일"
          value={period}
          onChange={setPeriod}
        >
          <option value={PERIOD.WITHIN_ONE_DAY}>1일 이내</option>
          <option value={PERIOD.WITHIN_ONE_WEEK}>1주 이내</option>
          <option value={PERIOD.WITHIN_ONE_MONTH}>1개월 이내</option>
          <option value={PERIOD.CUSTOM_PERIOD}>기간 설정...</option>
        </FilterSelect>
        <FilterSelect
          name="recruitmentStatus"
          placeholder="모집"
          value={recruitmentStatus}
          onChange={setRecruitmentStatus}
        >
          <option value={RECRUITMENT_STATUS.IS_OPEN}>모집 중</option>
          <option value={RECRUITMENT_STATUS.IS_CLOSED}>마감</option>
        </FilterSelect>
        <FilterSelect
          name="category"
          placeholder="전체"
          value={category}
          onChange={setCategory}
        >
          <option value={CATEGORY.TITLE}>글 제목</option>
          <option value={CATEGORY.CONTENT}>글 내용</option>
        </FilterSelect>
      </FilterGroup>
      {recruitmentList?.map((recruitmentItem: any) => (
        <RecruitItem key={recruitmentItem.recruitmentId} {...recruitmentItem} />
      ))}
    </Box>
  );
}
