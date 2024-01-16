import { InfoSubtext, ReviewItem } from '@anifriends/components';
import { useIntersect } from '@anifriends/hooks';
import { createFormattedTime } from '@anifriends/utils';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getVolunteerReviewsOnVolunteer } from '@/apis/volunteers';

type VolunteerReviewsProps = {
  id: number;
};

export default function VolunteerReviews({ id }: VolunteerReviewsProps) {
  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['volunteer', 'profile', 'reviews', id],
    queryFn: ({ pageParam }) =>
      getVolunteerReviewsOnVolunteer(id, { page: pageParam, size: 10 }),
    initialPageParam: 0,
    getNextPageParam: ({ data: { pageInfo } }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });

  const totalReviews = pages[0].data.pageInfo.totalElements;
  const reviews = pages.flatMap(({ data: { reviews } }) => reviews);

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <Box>
      <Heading fontSize="md" py={4}>
        봉사 후기 {totalReviews}개
      </Heading>
      <VStack spacing={2}>
        {reviews.map(
          (
            { shelterName, reviewContent, reviewCreatedAt, reviewImageUrls },
            index,
          ) => (
            <ReviewItem
              key={index}
              content={reviewContent}
              images={reviewImageUrls}
            >
              <Box>
                <HStack mb={1}>
                  <Text fontWeight={600}>{shelterName}</Text>
                </HStack>
                <InfoSubtext
                  title="작성일"
                  content={createFormattedTime(new Date(reviewCreatedAt))}
                />
              </Box>
            </ReviewItem>
          ),
        )}
      </VStack>
      <Box ref={ref} />
    </Box>
  );
}
