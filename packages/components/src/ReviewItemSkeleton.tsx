import {
  Card,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';

export function ReviewItemSkeleton() {
  return (
    <Card
      p={4}
      gap={4}
      width="full"
      border="1px"
      borderColor="gray.200"
      borderRadius={8}
      boxShadow="none"
    >
      <HStack>
        <SkeletonCircle />
        <Stack>
          <Skeleton w="36" h={4} />
          <Skeleton w="36" h={4} />
        </Stack>
      </HStack>
      <SkeletonText noOfLines={3} spacing="2" skeletonHeight="3" />
      <HStack>
        <Skeleton w="36" h="36" borderRadius="xl" />
        <Skeleton w="36" h="36" borderRadius="xl" />
      </HStack>
    </Card>
  );
}
