import { Suspense } from 'react';

import useFetchVolunteers from './hooks/useFetchVolunteers';
import useIntersect from './hooks/useIntersection';
import RecruitItem from './RecruitItem';

const PAGE_SIZE = 10;

function Recruitments() {
  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchVolunteers(PAGE_SIZE);

  const recruitments = pages.flatMap(({ data }) => data.recruitments);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    console.log('다시 패칭 요청 할까요?');
    console.log(hasNextPage, isFetchingNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      console.log('다시 패칭 요청 할게요');
      fetchNextPage();
    }
  });

  return (
    <>
      {recruitments.map((recruitment) => (
        <RecruitItem key={recruitment.recruitmentId} {...recruitment} />
      ))}
      <div ref={ref} />
    </>
  );
}

export default function VolunteersPage() {
  return (
    <Suspense fallback={<p>글목록 로딩중...</p>}>
      <Recruitments />
    </Suspense>
  );
}
