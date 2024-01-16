import { ApplicantStatus, InfoSubtext } from '@anifriends/components';
import { useIntersect } from '@anifriends/hooks';
import { createFormattedTime } from '@anifriends/utils';
import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getRecruitementsOfShelter,
  RecruitmentOfShleter,
} from '@/apis/shelter';

function ShelterRecruitmentItem({
  recruitmentId,
  recruitmentTitle,
  recruitmentStartTime,
  recruitmentDeadline,
  recruitmentApplicantCount,
  recruitmentCapacity,
}: RecruitmentOfShleter) {
  const navigate = useNavigate();

  const volunteerDate = createFormattedTime(
    new Date(recruitmentStartTime),
    'YY.MM.DD',
  );

  const deadline = createFormattedTime(
    new Date(recruitmentDeadline),
    'YY.MM.DD',
  );

  const goRecruitmentDetail = () => navigate(`/volunteers/${recruitmentId}`);

  return (
    <Card p={4} pb={3.5} mb={2} onClick={goRecruitmentDetail}>
      <CardBody pos="relative" p={0}>
        <Text pb={2} fontWeight={600}>
          {recruitmentTitle}
        </Text>
        <InfoSubtext title="봉사일" content={volunteerDate} />
        <InfoSubtext title="마감일" content={deadline} />
        <Box pos="absolute" right={0} bottom={0}>
          <ApplicantStatus
            numerator={recruitmentApplicantCount}
            denominator={recruitmentCapacity}
          />
        </Box>
      </CardBody>
    </Card>
  );
}

export default function ShelterRecruitments() {
  const { id } = useParams<{ id: string }>();
  const shelterId = Number(id);

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['shelter', shelterId, 'recruitments'],
    queryFn: async ({ pageParam }) =>
      (await getRecruitementsOfShelter(shelterId, pageParam, 10)).data,
    initialPageParam: 0,
    getNextPageParam: ({ pageInfo }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });

  const recruitments = pages.flatMap((item) => item.recruitments);

  const ref = useIntersect(async (entry, observeer) => {
    observeer.unobserve(entry.target);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <Box>
      <Heading fontWeight={600} fontSize="md" py={4}>
        보호소의 봉사 모집글 {pages[0].pageInfo.totalElements}개
      </Heading>
      {recruitments.map((recruitment) => {
        return (
          <ShelterRecruitmentItem
            key={recruitment.recruitmentId}
            {...recruitment}
          />
        );
      })}
      <div ref={ref} />
    </Box>
  );
}
