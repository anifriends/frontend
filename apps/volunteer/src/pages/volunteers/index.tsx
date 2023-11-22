import { Box } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { MouseEvent, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useIntersect from 'shared/hooks/useIntersection';
import { createFormattedTime } from 'shared/utils/date';

import VolunteerRecruitItem from '@/pages/volunteers/_components/VolunteerRecruitItem';
import recruitmentQueryOptions from '@/pages/volunteers/_queryOptions/recruitments';
import { Recruitment } from '@/types/apis/recruitment';

const createRecruitmentItem = (recruitment: Recruitment) => {
  const {
    recruitmentId,
    recruitmentTitle,
    shelterName,
    shelterImageUrl,
    recruitmentApplicantCount,
    recruitmentCapacity,
    recruitmentStartTime,
  } = recruitment;

  // TODO: volunteerDateDday 계산하기 위해 recruitmentDeadline 필요
  return {
    id: recruitmentId,
    title: recruitmentTitle,
    shelterName: shelterName,
    shelterProfileImage: shelterImageUrl,
    volunteerDate: createFormattedTime(
      new Date(recruitmentStartTime),
      'YY.MM.DD',
    ),
    volunteerDateDday: 12,
    applicantCount: recruitmentApplicantCount,
    recruitmentCapacity: recruitmentCapacity,
  };
};

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
      <div ref={ref} />
    </Box>
  );
}

export default function VolunteersPage() {
  return (
    <Suspense fallback={<p>글목록 로딩중...</p>}>
      <Recruitments />
    </Suspense>
  );
}
