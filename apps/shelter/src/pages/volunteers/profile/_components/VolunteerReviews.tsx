import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import InfoSubtext from 'shared/components/InfoSubtext';
import ReviewItem from 'shared/components/ReviewItem';
import { createFormattedTime } from 'shared/utils/date';

const DUMMY_REVIEWS_DATA = {
  reviewId: 36,
  shelterName: '남양주 보호소',
  reviewCreatedAt: '2023-03-16T18:00',
  reviewContent: '아이들이 너무 귀여워서 봉사하는 시간이 즐거웠습니다~!',
  images: [
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
  ],
};

const DUMMY_DATA = {
  pageInfo: {
    totalElements: 32,
    hasNext: false,
  },
  reviews: Array.from({ length: 5 }, () => DUMMY_REVIEWS_DATA),
};

export default function VolunteerReviews() {
  return (
    <Box>
      <Heading fontSize="md" py={4}>
        봉사 후기 {DUMMY_DATA.reviews.length}개
      </Heading>
      <VStack spacing={2}>
        {DUMMY_DATA.reviews.map(
          ({ shelterName, reviewContent, reviewCreatedAt, images }, index) => {
            return (
              <ReviewItem key={index} content={reviewContent} images={images}>
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
            );
          },
        )}
      </VStack>
    </Box>
  );
}
