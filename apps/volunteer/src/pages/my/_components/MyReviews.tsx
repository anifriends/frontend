import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Suspense } from 'react';
import InfoSubtext from 'shared/components/InfoSubtext';
import ReviewItem from 'shared/components/ReviewItem';

function MyReviews() {
  return (
    <Box minH={500}>
      <Heading fontWeight={600} fontSize="md" py={4}>
        작성한 후기 {5}개
      </Heading>
      <VStack spacing={2}>
        <ReviewItem showMenuButton={true} content="hello" images={[]}>
          <Box>
            <Text fontWeight={600} mb={2}>
              남양주 보호소
            </Text>
            <InfoSubtext title="작성일" content="23.12.07" />
          </Box>
        </ReviewItem>
      </VStack>
    </Box>
  );
}

export default function MyReviewsTab() {
  return (
    <Suspense>
      <MyReviews />
    </Suspense>
  );
}
