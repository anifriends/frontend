import { ReviewItem, ReviewItemSkeletonList } from '@anifriends/components';
import { useIntersect } from '@anifriends/hooks';
import { createFormattedTime } from '@anifriends/utils';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import useFetchShelterReviews from './hooks/useFetchShelterReviews';
import VolunteerProfile from './VolunteerProfile';

const PAGE_SIZE = 10;

function Reviews() {
  const navigate = useNavigate();

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

  const goVolunteerProfile = (id: number) => {
    navigate(`/volunteers/profile/${id}`);
  };

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
              onClickNextButton={() => goVolunteerProfile(review.volunteerId)}
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
