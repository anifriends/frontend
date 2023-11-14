import { useInfiniteQuery } from '@tanstack/react-query';

import { getShelterRecruitments } from '@/apis/recruitment';

export default function useFetchVolunteers(pageSize: number) {
  return useInfiniteQuery({
    queryKey: ['recruitments'],
    queryFn: ({ pageParam }) =>
      getShelterRecruitments({ pageNumber: pageParam, pageSize }),
    initialPageParam: 0,
    getNextPageParam: ({ data: { pageInfo } }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });
}
