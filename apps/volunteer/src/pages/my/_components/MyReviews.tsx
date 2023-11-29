import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoSubtext from 'shared/components/InfoSubtext';
import ReviewItem from 'shared/components/ReviewItem';
import useIntersect from 'shared/hooks/useIntersection';
import { createFormattedTime } from 'shared/utils/date';

import { getMyReviewsAPI } from '@/apis/volunteer';

function MyReviews() {
  const navigate = useNavigate();

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['myreviews'],
    queryFn: async ({ pageParam }) =>
      (await getMyReviewsAPI(pageParam, 10)).data,
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
    <Box minH={500}>
      <Heading fontWeight={600} fontSize="md" py={4}>
        작성한 후기 {pages[0].pageInfo.totalElements}개
      </Heading>
      <VStack spacing={2}>
        {reviews.map((review) => {
          const { reviewId, shelterId } = review;
          return (
            <ReviewItem
              key={reviewId}
              showMenuButton={true}
              content={review.reviewContent}
              images={review.reviewImageUrls}
              onUpdate={() =>
                navigate(`/shelters/${shelterId}/reviews/write/${reviewId}`)
              }
            >
              <Box>
                <Text fontWeight={600} mb={2}>
                  {review.shelterName}
                </Text>
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

export default function MyReviewsTab() {
  return (
    <Suspense fallback={<p>'로딩 중 입니다..'</p>}>
      <MyReviews />
    </Suspense>
  );
}
