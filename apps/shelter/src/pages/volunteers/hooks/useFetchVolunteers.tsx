import { useInfiniteQuery } from '@tanstack/react-query';

import { getShelterRecruitments } from '@/apis/recruitment';

export default function useFetchVolunteers() {
  return useInfiniteQuery({
    queryKey: ['recruitments'],
    queryFn: ({ pageParam }) =>
      getShelterRecruitments({ pageNumber: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastpage) =>
      lastpage.data.pageInfo.hasNext
        ? lastpage?.offset
          ? lastpage.offset + 1
          : undefined
        : undefined,
  });
}
