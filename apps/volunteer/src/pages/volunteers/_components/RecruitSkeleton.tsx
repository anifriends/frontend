import { Flex, Skeleton, Stack } from '@chakra-ui/react';

export default function RecruitSkeleton() {
  return (
    <Flex
      gap={3}
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      align="stretch"
    >
      <Skeleton w="160px" h="110px" />
      <Stack gap={1} w="full">
        <Skeleton w={14} h={4} />
        <Skeleton h={4} />
        <Skeleton h={4} />
        <Skeleton w={20} h={4} />
        <Skeleton w={14} h={4} mt={4} alignSelf="end" />
      </Stack>
    </Flex>
  );
}
