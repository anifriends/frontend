import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import InfoSubtext from 'shared/components/InfoSubtext';
import Label from 'shared/components/Label';
import ReviewItem from 'shared/components/ReviewItem';
import useIntersect from 'shared/hooks/useIntersection';
import { createFormattedTime } from 'shared/utils/date';

import { getVolunteerReviewsOnShelter } from '@/apis/review';

export default function ShelterReviews() {
  const { id } = useParams<{ id: string }>();
  const shelterId = Number(id);

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['shelter', shelterId, 'reviews'],
    queryFn: async ({ pageParam }) =>
      (
        await getVolunteerReviewsOnShelter(shelterId, {
          page: pageParam,
          size: 10,
        })
      ).data,
    initialPageParam: 1,
    getNextPageParam: ({ pageInfo }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });

  const reviews = pages.flatMap((item) => item.reviews);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <Box>
      <Heading fontWeight={600} fontSize="md" py={4}>
        보호소의 후기 {pages[0].pageInfo.totalElements}개
      </Heading>
      <VStack spacing={2}>
        {reviews.map((review) => {
          return (
            <ReviewItem
              key={review.reviewId}
              content={review.reviewContent}
              images={review.reviewImageUrls}
            >
              <Box>
                <HStack mb={1}>
                  <Text fontWeight={600}>{review.volunteerEmail}</Text>
                  <Label labelTitle={`${review.volunteerTemperature}℃`} />
                </HStack>
                <InfoSubtext
                  title="작성일"
                  content={createFormattedTime(
                    new Date(review.reviewCreatedAt),
                    'YY.MM.DD',
                  )}
                />
              </Box>
            </ReviewItem>
          );
        })}
      </VStack>
      <div ref={ref} />
    </Box>
  );
}
