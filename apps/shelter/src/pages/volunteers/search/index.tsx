import { Box } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useIntersect from '@/hooks/useIntersection';
import RecruitItem from '@/pages/volunteers/_components/RecruitItem';
import useFetchVolunteers from '@/pages/volunteers/_hooks/useFetchVolunteers';
import RecruitmentsSearchFilter from '@/pages/volunteers/search/_components/RecruitmentsSearchFilter';
import { useVolunteerSearch } from '@/pages/volunteers/search/_hooks/useVolunteerSearch';
import { VolunteerSearchFilter } from '@/pages/volunteers/search/_types/filter';
import { getDatesFromPeriod } from '@/pages/volunteers/search/_utils/period';
import { RecruitmentSearchFilter } from '@/types/apis/recruitment';

const getVolunteerSearchRequestFilter = (
  searchFilter: Partial<VolunteerSearchFilter>,
): Partial<RecruitmentSearchFilter> => {
  const { keyword, period, recruitmentStatus, searchType } = searchFilter;
  const { startDate, endDate } = getDatesFromPeriod(period);

  return {
    keyword,
    startDate,
    endDate,
    closedFilter: recruitmentStatus,
    keywordFilter: searchType,
  };
};

function Recruitments() {
  const { isKeywordSearched, searchFilter, handleChangeSearchFilter } =
    useVolunteerSearch();

  const navigate = useNavigate();

  const goToManageApplyPage = (postId: number) => {
    navigate(`/manage/apply/${postId}`);
  };
  const goToManageAttendancePage = (postId: number) => {
    navigate(`/manage/attendance/${postId}`);
  };
  const goToUpdatePage = (postId: number) => {
    navigate(`/volunteers/write/${postId}`);
  };

  //TODO 삭제 버튼 눌렀을 때 기능 추가

  //TODO recruit id 받아서 마감
  const closeRecruit = () => {};

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useFetchVolunteers(10, getVolunteerSearchRequestFilter(searchFilter));

  useEffect(() => {
    refetch();
  }, [searchFilter]);

  const recruitments = pages.flatMap(({ data }) => data.recruitments);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (!isKeywordSearched) {
    return null;
  }

  return (
    <Box>
      <RecruitmentsSearchFilter
        searchFilter={searchFilter}
        onChangeFilter={handleChangeSearchFilter}
      />
      <Suspense fallback={<p>글목록 로딩중...</p>}>
        {recruitments?.map((recruitment) => (
          <RecruitItem
            key={recruitment.recruitmentId}
            {...recruitment}
            onClickManageApplyButton={() =>
              goToManageApplyPage(recruitment.recruitmentId)
            }
            onClickManageAttendanceButton={() =>
              goToManageAttendancePage(recruitment.recruitmentId)
            }
            onClickCloseRecruitButton={closeRecruit}
            onUpdate={() => goToUpdatePage(recruitment.recruitmentId)}
          />
        ))}
      </Suspense>
      <div ref={ref} />
    </Box>
  );
}

export default function VolunteersSearchPage() {
  return (
    <Suspense fallback={<p>검색 결과 로딩중...</p>}>
      <Recruitments />
    </Suspense>
  );
}
