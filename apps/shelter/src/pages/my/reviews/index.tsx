import { Box, Heading, VStack } from '@chakra-ui/react';
import { Suspense } from 'react';
import ReviewItem from 'shared/components/ReviewItem';

import useIntersect from '@/hooks/useIntersection';

import useFetchShelterReviews from './hooks/useFetchShelterReviews';
import VolunteerProfile from './VolunteerProfile';

const DUMMY_IMAGE = 'https://source.unsplash.com/random';

const DUMMY_IMAGE_LIST = Array.from({ length: 4 }, () => DUMMY_IMAGE);
const DUMMY_REVIEW = {
  reviewId: 32,
  reviewCreatedAt: '2023-03-16T18:00',
  reviewContent: '시설이 너무 깨끗하고 강아지도...',
  reviewImageUrls: [DUMMY_IMAGE, DUMMY_IMAGE],
  volunteerName: '강혜린',
  volunteerTemperature: 44,
  volunteerReviewCount: 4,
  volunteerImageUrl: DUMMY_IMAGE,
};

const DUMMY_REVIEW_LIST = Array.from({ length: 4 }, () => DUMMY_REVIEW);

const PAGE_SIZE = 10;

function Reviews() {
  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchShelterReviews(PAGE_SIZE);

  const totalReviews = pages[0].data.pageInfo.totalElements;

  const reviews = pages.flatMap(({ data }) => data.reviews);

  console.log(totalReviews, reviews);

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
        봉사자들이 작성한 봉사후기{` ${DUMMY_REVIEW_LIST.length}개`}
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
              reviewCreatedAt={review.reviewCreatedAt}
            />
          </ReviewItem>
        ))}
      </VStack>
      <Box ref={ref} />
    </Box>
  );
}

export default function MyReviewsPage() {
  return (
    <Suspense fallback={<p>글목록 로딩중...</p>}>
      <Reviews />
    </Suspense>
  );
}
