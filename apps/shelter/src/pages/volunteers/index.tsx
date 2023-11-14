import useFetchVolunteers from './hooks/useFetchVolunteers';
import useIntersect from './hooks/useIntersection';
import RecruitItem from './RecruitItem';

export default function VolunteersPage() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
    useFetchVolunteers(10);

  const recruitments = data?.pages.flatMap(({ data }) => data.recruitments);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    console.log('다시 패칭 요청 할까요?');
    console.log(hasNextPage, isFetchingNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      console.log('다시 패칭 요청 할게요');
      fetchNextPage();
    }
  });

  if (status === 'pending') {
    return <> '로딩 중'</>;
  }

  return (
    <>
      {recruitments?.map((recruitment) => (
        <RecruitItem key={recruitment.recruitmentId} {...recruitment} />
      ))}
      <div ref={ref} />
    </>
  );
}
