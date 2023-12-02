import { Box, IconButton } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from 'shared/components/AlertModal';
import useIntersect from 'shared/hooks/useIntersection';

import { useVolunteerRecruitItem } from '@/pages/volunteers/_hooks/useVolunteerRecruitItem';
import recruitmentQueryOptions from '@/pages/volunteers/_queryOptions/recruitment';
import { createRecruitmentItem } from '@/pages/volunteers/_utils/recruitment';

import PlusIcon from './_components/PlusIcon';
import RecruitSkeletonList from './_components/RecruitSkeletonList';
import VolunteerRecruitItem from './_components/VolunteerRecruitItem';

function Recruitments() {
  const navigate = useNavigate();
  const goWritePage = () => navigate('/volunteers/write');

  const infiniteQueryOption = recruitmentQueryOptions.all();

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
  } = useVolunteerRecruitItem(infiniteQueryOption.queryKey);

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(infiniteQueryOption);

  const recruitments = pages
    .flatMap(({ data }) => data.recruitments)
    .map(createRecruitmentItem);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <Box pb="50px">
      {recruitments.map((recruitment) => (
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
      <IconButton
        size="lg"
        aria-label="Plus Button"
        icon={<PlusIcon />}
        pos="fixed"
        bottom="4.125rem"
        right={4}
        borderRadius="full"
        bgColor="orange.400"
        color="white"
        onClick={goWritePage}
        boxShadow="lg"
      />
      <AlertModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        {...alertModalState}
      />
    </Box>
  );
}

export default function VolunteersPage() {
  return (
    <Suspense fallback={<RecruitSkeletonList />}>
      <Recruitments />
    </Suspense>
  );
}
