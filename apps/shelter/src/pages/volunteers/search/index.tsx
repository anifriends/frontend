import { Box } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import AlertModal from 'shared/components/AlertModal';
import useIntersect from 'shared/hooks/useIntersection';
import { getDatesFromPeriod } from 'shared/utils/period';

import VolunteerRecruitItem from '@/pages/volunteers/_components/VolunteerRecruitItem';
import { useVolunteerRecruitItem } from '@/pages/volunteers/_hooks/useVolunteerRecruitItem';
import recruitmentQueryOptions from '@/pages/volunteers/_queryOptions/recruitment';
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

  const {
    goVolunteersDetail,
    goManageApplyPage,
    goManageAttendancePage,
    goUpdatePage,
    confirmRecruitmentClose,
    confirmRecruitmentDelete,
    alertModalState,
    isModalOpen,
    onCloseModal,
  } = useVolunteerRecruitItem();

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
          onUpdateRecruitment={goUpdatePage}
          onDeleteRecruitment={confirmRecruitmentDelete}
          onManageApplies={goManageApplyPage}
          onManageAttendances={goManageAttendancePage}
          onCloseRecruitment={confirmRecruitmentClose}
        />
      ))}
      {isFetchingNextPage ? <RecruitSkeletonList /> : <div ref={ref} />}
      <AlertModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        {...alertModalState}
      />
    </Box>
  );
}
