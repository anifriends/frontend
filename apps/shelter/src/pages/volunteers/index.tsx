import RecruitItem from './RecruitItem';

const DUMMY_RECRUITMENT = {
  recruitmentId: 1,
  recruitmentTitle: '봉사자를 모집합니다',
  recruitmentStartTime: '2021-11-08T11:44:30.327959',
  recruitmentEndTime: '2021-11-08T11:44:30.327959',
  recruitmentDeadline: '2021-11-08T11:44:30.327959',
  recruitmentIsClosed: false,
  recruitmentApplicantCount: 15,
  recruitmentCapacity: 15,
};

const DUMMY_RECRUITMENT_LIST = Array.from(
  { length: 10 },
  () => DUMMY_RECRUITMENT,
);

export default function VolunteersPage() {
  return (
    <>
      {DUMMY_RECRUITMENT_LIST.map((recruitment) => (
        <RecruitItem key={recruitment.recruitmentId} {...recruitment} />
      ))}
    </>
  );
}
