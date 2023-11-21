import { Box } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import VolunteerRecruitItem from '@/pages/volunteers/_components/VolunteerRecruitItem';
import RecruitmentsSearchFilter from '@/pages/volunteers/search/_components/RecruitmentsSearchFilter';
import { useRecruitmentSearch } from '@/pages/volunteers/search/_hooks/useRecruitmentSearch';

const DUMMY_RECRUITMENT = {
  id: 1,
  title: '봉사자 모집합니다!!',
  shelterName: '양천구 보건소',
  shelterProfileImage: 'https://source.unsplash.com/random',
  volunteerDate: '23.10.23',
  volunteerDateDday: 12,
  applicantCount: 2,
  recruitmentCapacity: 6,
};

const DUMMY_RECRUITMENT_LIST = Array.from(
  { length: 4 },
  () => DUMMY_RECRUITMENT,
);

export default function VolunteersSearchPage() {
  const { isKeywordSearched, searchFilter, handleChangeSearchFilter } =
    useRecruitmentSearch();

  const navigate = useNavigate();

  const goVolunteersDetail = (event: MouseEvent<HTMLElement>) => {
    const recruitmentId = event.currentTarget.getAttribute('data-id');

    if (recruitmentId) {
      navigate(`/volunteers/${recruitmentId}`);
    }
  };

  //TODO 삭제 버튼 눌렀을 때 기능 추가

  //TODO recruit id 받아서 마감
  const closeRecruit = () => {};

  if (!isKeywordSearched) {
    return null;
  }

  return (
    <Box>
      <RecruitmentsSearchFilter
        searchFilter={searchFilter}
        onChangeFilter={handleChangeSearchFilter}
      />
      {DUMMY_RECRUITMENT_LIST?.map((recruitment) => (
        <VolunteerRecruitItem
          key={recruitment.id}
          recruitment={recruitment}
          onClickItem={goVolunteersDetail}
        />
      ))}
    </Box>
  );
}
