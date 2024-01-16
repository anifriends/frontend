import { useIntersect } from '@anifriends/hooks';
import { getDatesFromPeriod } from '@anifriends/utils';
import { Box } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import VolunteerRecruitItem from '@/pages/volunteers/_components/VolunteerRecruitItem';
import recruitmentQueryOptions from '@/pages/volunteers/_queryOptions/recruitments';
import { createRecruitmentItem } from '@/pages/volunteers/_utils/recruitment';
import RecruitmentsSearchFilter from '@/pages/volunteers/search/_components/RecruitmentsSearchFilter';
import { useRecruitmentSearch } from '@/pages/volunteers/search/_hooks/useRecruitmentSearch';
import { SearchFilter } from '@/pages/volunteers/search/_types/filter';
import { RecruitmentSearchFilter } from '@/types/apis/recruitment';

import RecruitSkeletonList from '../_components/RecruitSkeletonList';

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

  const goVolunteersDetail = (event: MouseEvent<HTMLElement>) => {
    const recruitmentId = event.currentTarget.getAttribute('data-id');

    if (recruitmentId) {
      navigate(`/volunteers/${recruitmentId}`);
    }
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
    return <RecruitSkeletonList />;
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
          onClickItem={goVolunteersDetail}
        />
      ))}
      {isFetchingNextPage ? <RecruitSkeletonList /> : <div ref={ref} />}
    </Box>
  );
}
