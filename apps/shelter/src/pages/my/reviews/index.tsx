import { Box, Heading, VStack } from '@chakra-ui/react';
import { Suspense } from 'react';
import ReviewItem from 'shared/components/ReviewItem';
import ReviewItemSkeletonList from 'shared/components/ReviewItemSkeletonList';
import useIntersect from 'shared/hooks/useIntersection';
import { createFormattedTime } from 'shared/utils/date';

import useFetchShelterReviews from './hooks/useFetchShelterReviews';
import VolunteerProfile from './VolunteerProfile';

const PAGE_SIZE = 10;

function Reviews() {
  //TODO 봉사자 옆에 화살표 버튼 클릭시 봉사자 프로필 페이지로 가는 기능추가

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchShelterReviews(PAGE_SIZE);

  const totalReviews = pages[0].data.pageInfo.totalElements;
  const reviews = pages.flatMap(({ data }) => data.reviews);
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <Box px={4}>
      <Heading
        mt={6}
        mb={4}
        as="h1"
        size="4xl"
        noOfLines={1}
        fontSize="md"
        fontWeight="bold"
      >
        봉사자들이 작성한 봉사후기{` ${totalReviews}개`}
      </Heading>

      <VStack spacing={3}>
        {reviews.map((review) => (
          <ReviewItem
            content={review.reviewContent}
            images={review.reviewImageUrls}
            key={review.reviewId}
          >
            <VolunteerProfile
              volunteerName={review.volunteerName}
              volunteerTempature={review.volunteerTemperature}
              volunteerReviewCount={review.volunteerReviewCount}
              volunteerImageUrl={review.volunteerImageUrl}
              reviewCreatedAt={createFormattedTime(
                new Date(review.reviewCreatedAt),
                'YY.MM.DD.',
              )}
            />
          </ReviewItem>
        ))}
      </VStack>
      {isFetchingNextPage ? <ReviewItemSkeletonList /> : <Box ref={ref} />}
    </Box>
  );
}

export default function MyReviewsPage() {
  return (
    <Suspense fallback={<ReviewItemSkeletonList showTitle />}>
      <Reviews />
    </Suspense>
  );
}
