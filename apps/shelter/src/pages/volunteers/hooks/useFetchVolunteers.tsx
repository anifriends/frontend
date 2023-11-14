import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';

import {
  getShelterRecruitments,
  RecruitmentSearchResponse,
} from '@/apis/recruitment';

export default function useFetchVolunteers(
  pageSize: number,
): UseSuspenseInfiniteQueryResult<
  InfiniteData<RecruitmentSearchResponse>,
  Error
> {
  return useSuspenseInfiniteQuery({
    queryKey: ['recruitments'],
    queryFn: ({ pageParam }) =>
      getShelterRecruitments({ pageNumber: pageParam, pageSize }),
    initialPageParam: 0,
    getNextPageParam: ({ pageInfo }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });
}
