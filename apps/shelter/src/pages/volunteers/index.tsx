import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import RecruitItem from './_components/RecruitItem';
import useFetchVolunteers from './hooks/useFetchVolunteers';
import useIntersect from './hooks/useIntersection';

const PAGE_SIZE = 10;

function Recruitments() {
  const navigate = useNavigate();

  const goToManagePage = (postId: number) => {
    navigate(`/manage/apply/${postId}`);
  };

  //TODO recruit id 받아서 마감
  const closeRecruit = () => {};

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
        <RecruitItem
          key={recruitment.recruitmentId}
          {...recruitment}
          onClickManageButton={() => goToManagePage(recruitment.recruitmentId)}
          onClickCloseRecruitButton={closeRecruit}
        />
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
