import { Box, Skeleton, VStack } from '@chakra-ui/react';

import { ReviewItemSkeleton } from '.';

export function ReviewItemSkeletonList({
  showTitle = false,
}: {
  showTitle?: boolean;
}) {
  return (
    <Box px={4}>
      {showTitle && <Skeleton w={60} h={6} mt={6} mb={4} />}
      <VStack spacing={3}>
        <ReviewItemSkeleton />
        <ReviewItemSkeleton />
      </VStack>
    </Box>
  );
}
