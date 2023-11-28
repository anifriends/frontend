import { Skeleton, Stack } from '@chakra-ui/react';

export default function RecruitSkeleton() {
  return (
    <Stack
      gap={3}
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      align="stretch"
    >
      <Skeleton w={14} h={4} />
      <Skeleton h={4} />
      <Skeleton h={8} />
      <Skeleton h={8} />
    </Stack>
  );
}
