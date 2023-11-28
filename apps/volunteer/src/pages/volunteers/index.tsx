import { Box } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { MouseEvent, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useIntersect from 'shared/hooks/useIntersection';

import RecruitSkeleton from '@/components/RecruitSkeleton';
import VolunteerRecruitItem from '@/pages/volunteers/_components/VolunteerRecruitItem';
import recruitmentQueryOptions from '@/pages/volunteers/_queryOptions/recruitments';
import { createRecruitmentItem } from '@/pages/volunteers/_utils/recruitment';

function Recruitments() {
  const navigate = useNavigate();

  const goVolunteersDetail = (event: MouseEvent<HTMLElement>) => {
    const recruitmentId = event.currentTarget.getAttribute('data-id');

    if (recruitmentId) {
      navigate(`/volunteers/${recruitmentId}`);
    }
  };

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(recruitmentQueryOptions.all());

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
    <Box>
      {recruitments.map((recruitment) => (
        <VolunteerRecruitItem
          key={recruitment.id}
          recruitment={recruitment}
          onClickItem={goVolunteersDetail}
        />
      ))}
      {isFetchingNextPage ? <VolunteersPageSkeleton /> : <div ref={ref} />}
    </Box>
  );
}

function VolunteersPageSkeleton() {
  return (
    <>
      <RecruitSkeleton />
      <RecruitSkeleton />
    </>
  );
}

export default function VolunteersPage() {
  return (
    <Suspense fallback={<VolunteersPageSkeleton />}>
      <Recruitments />
    </Suspense>
  );
}
