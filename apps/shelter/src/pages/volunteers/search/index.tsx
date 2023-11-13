import { Box } from '@chakra-ui/react';

import RecruitItem from '@/pages/volunteers/RecruitItem';
import FilterGroup from '@/pages/volunteers/search/_components/FilterGroup';
import FilterSelect from '@/pages/volunteers/search/_components/FilterSelect';
import { useVolunteerSearchFilter } from '@/pages/volunteers/search/_hooks/useVolunteerSearchFilter';

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

const DUMMY_RECRUITMENT_LIST = Array.from({ length: 10 }, (_, index) => {
  return {
    ...DUMMY_RECRUITMENT,
    recruitmentId: index,
  };
});

export default function VolunteersSearchPage() {
  const {
    isSearched,
    volunteerSearchFilter,
    setPeriod,
    setRecruitmentStatus,
    setCategory,
  } = useVolunteerSearchFilter();

  const { period, recruitmentStatus, category } = volunteerSearchFilter;

  if (!isSearched) {
    return null;
  }

  return (
    <Box>
      <FilterGroup>
        <FilterSelect
          name="period"
          placeholder="전체 기간"
          value={period}
          onChange={setPeriod}
        >
          <option value="previousDay">지난 1일</option>
          <option value="previousWeek">지난 1주</option>
          <option value="previousMonth">지난 1개월</option>
          <option value="customPeriod">기간 설정...</option>
        </FilterSelect>
        <FilterSelect
          name="recruitmentStatus"
          placeholder="모집"
          value={recruitmentStatus}
          onChange={setRecruitmentStatus}
        >
          <option value="isOpen">모집 중</option>
          <option value="isClosed">마감</option>
        </FilterSelect>
        <FilterSelect
          name="category"
          placeholder="전체"
          value={category}
          onChange={setCategory}
        >
          <option value="title">글 제목</option>
          <option value="content">글 내용</option>
        </FilterSelect>
      </FilterGroup>
      <>
        {DUMMY_RECRUITMENT_LIST.map((recruitment) => (
          <RecruitItem key={recruitment.recruitmentId} {...recruitment} />
        ))}
      </>
    </Box>
  );
}
