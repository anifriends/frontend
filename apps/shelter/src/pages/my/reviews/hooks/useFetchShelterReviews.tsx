import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getShelterReviewList } from '@/apis/shelter';

export default function useFetchShelterReviews(pageSize: number) {
  return useSuspenseInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: ({ pageParam }) =>
      getShelterReviewList({ pageNumber: pageParam, pageSize }),
    initialPageParam: 0,
    getNextPageParam: ({ data: { pageInfo } }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });
}
