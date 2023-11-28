import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import InfoSubtext from 'shared/components/InfoSubtext';
import Label from 'shared/components/Label';
import ReviewItem from 'shared/components/ReviewItem';
import useIntersect from 'shared/hooks/useIntersection';

import { getVolunteerReviewsOnShelter } from '@/apis/review';

export default function ShelterReviews() {
  const { id } = useParams();
  const shelterId = Number(id);

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['shelter', 'reviews', shelterId],
    queryFn: async ({ pageParam }) =>
      (await getVolunteerReviewsOnShelter(shelterId, pageParam, 10)).data,
    initialPageParam: 0,
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
        보호소의 후기 {pages[0]?.pageInfo.totalElements}개
      </Heading>
      <VStack spacing={2}>
        {reviews.map((review, index) => {
          const {
            reviewContent,
            reviewImageUrls: images,
            volunteerEmail: email,
            volunteerTemperature: temperature,
            reviewCreatedAt: createdAt,
          } = review;
          return (
            <ReviewItem key={index} content={reviewContent} images={images}>
              <Box>
                <HStack mb={1}>
                  <Text fontWeight={600}>{email}</Text>
                  <Label labelTitle={`${temperature}℃`} />
                </HStack>
                <InfoSubtext title="작성일" content={createdAt} />
              </Box>
            </ReviewItem>
          );
        })}
      </VStack>
      <div ref={ref} />
    </Box>
  );
}
