import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import useIntersect from '@/hooks/useIntersection';

import RecruitItem from './_components/RecruitItem';
import useFetchVolunteers from './hooks/useFetchVolunteers';

const PAGE_SIZE = 10;

function Recruitments() {
  const navigate = useNavigate();

  const goToManageApplyPage = (postId: number) => {
    navigate(`/manage/apply/${postId}`);
  };
  const goToManageAttendancePage = (postId: number) => {
    navigate(`/manage/attendance/${postId}`);
  };
  const goToUpdatePage = (postId: number) => {
    navigate(`/volunteers/write/${postId}`);
  };

  //TODO 삭제 버튼 눌렀을 때 기능 추가

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
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <>
      {recruitments.map((recruitment) => (
        <RecruitItem
          key={recruitment.recruitmentId}
          {...recruitment}
          onClickManageApplyButton={() =>
            goToManageApplyPage(recruitment.recruitmentId)
          }
          onClickManageAttendanceButton={() =>
            goToManageAttendancePage(recruitment.recruitmentId)
          }
          onClickCloseRecruitButton={closeRecruit}
          onUpdate={() => goToUpdatePage(recruitment.recruitmentId)}
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
