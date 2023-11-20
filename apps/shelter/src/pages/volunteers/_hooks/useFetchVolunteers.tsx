import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { getShelterRecruitments } from '@/apis/recruitment';
import {
  RecruitementsResponse,
  RecruitmentSearchFilter,
} from '@/types/apis/recruitment';

export default function useFetchVolunteers(
  pageSize = 10,
  searchFilter?: Partial<RecruitmentSearchFilter>,
): UseSuspenseInfiniteQueryResult<
  InfiniteData<AxiosResponse<RecruitementsResponse, Error>>
> {
  return useSuspenseInfiniteQuery({
    queryKey: ['recruitments', searchFilter],
    queryFn: ({ pageParam }) =>
      getShelterRecruitments({
        ...searchFilter,
        pageNumber: pageParam,
        pageSize: pageSize,
      }),
    initialPageParam: 0,
    getNextPageParam: ({ data: { pageInfo } }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });
}
