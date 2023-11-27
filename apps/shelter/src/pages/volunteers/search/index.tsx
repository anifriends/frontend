import { Box } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useIntersect from 'shared/hooks/useIntersection';
import { getDatesFromPeriod } from 'shared/utils/period';

import VolunteerRecruitItem from '@/pages/volunteers/_components/VolunteerRecruitItem';
import recruitmentQueryOptions from '@/pages/volunteers/_queryOptions/recruitment';
import { createRecruitmentItem } from '@/pages/volunteers/_utils/recruitment';
import RecruitmentsSearchFilter from '@/pages/volunteers/search/_components/RecruitmentsSearchFilter';
import { useRecruitmentSearch } from '@/pages/volunteers/search/_hooks/useRecruitmentSearch';
import { SearchFilter } from '@/pages/volunteers/search/_types/filter';
import { RecruitmentSearchFilter } from '@/types/apis/recruitment';

const getVolunteerSearchRequestFilter = (
  searchFilter: Partial<SearchFilter>,
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
    useRecruitmentSearch();

  const navigate = useNavigate();

  const goVolunteersDetail = (recruitmentId: number) => {
    navigate(`/volunteers/${recruitmentId}`);
  };
  const goManageApplyPage = (recruitmentId: number) => {
    navigate(`/manage/apply/${recruitmentId}`);
  };
  const goManageAttendancePage = (recruitmentId: number) => {
    navigate(`/manage/attendance/${recruitmentId}`);
  };
  const goUpdatePage = (recruitmentId: number) => {
    navigate(`/volunteers/write/${recruitmentId}`);
  };

  const closeRecruit = (recruitmentId: number) => {
    console.log(recruitmentId);
  };
  const deleteRecruit = (recruitmentId: number) => {
    console.log(recruitmentId);
  };

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery(
      recruitmentQueryOptions.search(
        getVolunteerSearchRequestFilter(searchFilter),
        isKeywordSearched,
      ),
    );

  const recruitments = data?.pages
    .flatMap(({ data }) => data.recruitments)
    .map(createRecruitmentItem);

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
        <VolunteerRecruitItem
          key={recruitment.id}
          recruitment={recruitment}
          onClickItem={() => goVolunteersDetail(recruitment.id)}
          onUpdateRecruitment={() => goUpdatePage(recruitment.id)}
          onDeleteRecruitment={() => deleteRecruit(recruitment.id)}
          onManageApplies={() => goManageApplyPage(recruitment.id)}
          onManageAttendances={() => goManageAttendancePage(recruitment.id)}
          onCloseRecruitment={() => closeRecruit(recruitment.id)}
        />
      ))}
      <div ref={ref} />
    </Box>
  );
}
