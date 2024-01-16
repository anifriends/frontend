import { Label } from '@anifriends/components';
import { useIntersect } from '@anifriends/hooks';
import { createFormattedTime } from '@anifriends/utils';
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  useToken,
} from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getVolunteerApplicants } from '@/apis/volunteer';
import { APPLICANT_STATUS } from '@/constants/applicantStatus';
import type { Applicant } from '@/types/apis/volunteer';

type ApplyRecruitmentItemProps = {
  applyRecruitment: Applicant;
};

export default function ApplyRecruitments() {
  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['my', 'apply', 'recruitments'],
    queryFn: ({ pageParam }) =>
      getVolunteerApplicants({ page: pageParam, size: 10 }),
    initialPageParam: 0,
    getNextPageParam: ({ data: { pageInfo } }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });

  const totalApplyRecruitments = pages[0].data.pageInfo.totalElements;
  const applyRecruitments = pages.flatMap(
    ({ data: { applicants } }) => applicants,
  );

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <Box>
      <Heading fontSize="md" mb={3}>
        {`신청한 봉사 ${totalApplyRecruitments}개`}
      </Heading>
      {applyRecruitments.map((applyRecruitment, index) => (
        <ApplyRecruitmentItem key={index} applyRecruitment={applyRecruitment} />
      ))}
      <Box ref={ref} />
    </Box>
  );
}

function ApplyRecruitmentItem({
  applyRecruitment: {
    applicantStatus,
    recruitmentTitle,
    shelterName,
    recruitmentStartTime,
    applicantIsWritedReview,
    shelterId,
    applicantId,
  },
}: ApplyRecruitmentItemProps) {
  const [orange400] = useToken('colors', ['orange.400']);
  const navigate = useNavigate();

  return (
    <Card mb={2}>
      <CardBody p={4}>
        <Label
          labelTitle={APPLICANT_STATUS[applicantStatus].KOR}
          type={APPLICANT_STATUS[applicantStatus].COLOR}
        />
        <Text fontWeight="semibold">{recruitmentTitle}</Text>
        <Text fontSize="sm" color="gray.400">
          {shelterName}
        </Text>
        <Text fontSize="sm">
          <Text as="span" color="gray.400">
            봉사일
          </Text>
          <Text as="span" fontWeight="semibold" color="gray.500">
            {` ${createFormattedTime(new Date(recruitmentStartTime))}`}
          </Text>
        </Text>
        {applicantStatus === APPLICANT_STATUS.ATTENDANCE.ENG &&
          !applicantIsWritedReview && (
            <Button
              size="sm"
              mt={4}
              w="100%"
              border={`1px solid ${orange400}`}
              bgColor="inherit"
              borderRadius={10}
              color="orange.400"
              _hover={{ bgColor: undefined }}
              _active={{ bgColor: undefined }}
              onClick={() =>
                navigate(
                  `/shelters/${shelterId}/reviews/applicants/${applicantId}/write`,
                )
              }
            >
              후기 작성하기
            </Button>
          )}
      </CardBody>
    </Card>
  );
}
