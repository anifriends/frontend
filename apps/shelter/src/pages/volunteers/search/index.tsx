import { Box } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useIntersect from '@/hooks/useIntersection';
import RecruitItem from '@/pages/volunteers/_components/RecruitItem';
import recruitmentQueryOptions from '@/pages/volunteers/_queryOptions/recruitment';
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

export default function VolunteersSearchPage() {
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

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery(
      recruitmentQueryOptions.search(
        getVolunteerSearchRequestFilter(searchFilter),
        isKeywordSearched,
      ),
    );

  const recruitments = data?.pages.flatMap(({ data }) => data.recruitments);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (!isKeywordSearched) {
    return null;
  }

  if (isLoading) {
    return <p>로딩중</p>;
  }

  return (
    <Box>
      <RecruitmentsSearchFilter
        searchFilter={searchFilter}
        onChangeFilter={handleChangeSearchFilter}
      />
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
      <div ref={ref} />
    </Box>
  );
}
