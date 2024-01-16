import { useIntersect } from '@anifriends/hooks';
import { createFormattedTime } from '@anifriends/utils';
import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getVolunteerRecruitmentsOnVolunteer } from '@/apis/volunteers';

type VolunteerRecruitmentItemProps = {
  recruitmentTitle: string;
  recruitmentStartTime: string;
  shelterName: string;
};

type VolunteerRecruitmentsProps = {
  id: number;
};

export default function VolunteerRecruitments({
  id,
}: VolunteerRecruitmentsProps) {
  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['volunteer', 'profile', 'recruitments', id],
    queryFn: ({ pageParam }) =>
      getVolunteerRecruitmentsOnVolunteer(id, { page: pageParam, size: 10 }),
    initialPageParam: 0,
    getNextPageParam: ({ data: { pageInfo } }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });

  const totalRecruitments = pages[0].data.pageInfo.totalElements;
  const recruitments = pages.flatMap(
    ({ data: { recruitments } }) => recruitments,
  );

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <Box>
      <Heading fontWeight={600} fontSize="md" py={4}>
        봉사 이력 {totalRecruitments}개
      </Heading>
      {recruitments.map((recruitment, index) => (
        <VolunteerRecruitmentItem key={index} {...recruitment} />
      ))}
      <Box ref={ref} />
    </Box>
  );
}

function VolunteerRecruitmentItem({
  shelterName,
  recruitmentTitle,
  recruitmentStartTime,
}: VolunteerRecruitmentItemProps) {
  return (
    <Card p={4} pb={3.5} mb={2}>
      <CardBody pos="relative" p={0}>
        <Text pb={2} fontWeight={600}>
          {recruitmentTitle}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {shelterName}
        </Text>
        <Text fontSize="sm" color="black">
          {`봉사일 | ${createFormattedTime(new Date(recruitmentStartTime))}`}
        </Text>
      </CardBody>
    </Card>
  );
}
