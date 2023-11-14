import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';

import {
  getShelterRecruitments,
  RecruitmentSearchResponse,
  RecruitSearchFilter,
} from '@/apis/recruitment';

export default function useFetchVolunteers(
  pageSize: number,
  filter?: RecruitSearchFilter,
): UseSuspenseInfiniteQueryResult<
  InfiniteData<RecruitmentSearchResponse>,
  Error
> {
  return useSuspenseInfiniteQuery({
    queryKey: ['recruitments'],
    queryFn: ({ pageParam }) =>
      getShelterRecruitments({ pageNumber: pageParam, pageSize, ...filter }),
    initialPageParam: 0,
    getNextPageParam: ({ pageInfo }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });
}
