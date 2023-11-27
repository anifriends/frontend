import { useNavigate } from 'react-router-dom';

export const useVolunteerRecruitItem = () => {
  const navigate = useNavigate();

  const goVolunteersDetail = (recruitmentId: number) => {
    navigate(`/volunteers/${recruitmentId}`);
  };
  const goManageApplyPage = (recruitmentId: number) => {
    navigate(`/manage/apply/${recruitmentId}`);
  };
  const goManageAttendancePage = (recruitmentId: number) => {
    navigate(`/manage/attendance/${recruitmentId}`);
  };
  const goUpdatePage = (recruitmentId: number) => {
    navigate(`/volunteers/write/${recruitmentId}`);
  };

  const closeRecruitment = (recruitmentId: number) => {
    console.log(recruitmentId);
  };
  const deleteRecruitment = (recruitmentId: number) => {
    console.log(recruitmentId);
  };

  return {
    goVolunteersDetail,
    goManageApplyPage,
    goManageAttendancePage,
    goUpdatePage,
    closeRecruitment,
    deleteRecruitment,
  };
};
