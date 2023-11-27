import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useVolunteerRecruitItem = () => {
  const [selectedRecruitmentId, setSelectedRecruitmentId] = useState(0);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [alertModalState, setAlertModalState] = useState({
    modalTitle: '',
    modalContent: '',
    btnTitle: '',
    onClick: () => {},
  });

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

  const closeRecruitment = () => {
    // TODO: 봉사자 모집글 마감 API 호출
    // closeRecruitment(selectedRecruitmentId);
    console.log('closeRecruitment', selectedRecruitmentId);
    onClose();
  };

  const confirmRecruitmentClose = (recruitmentId: number) => {
    setSelectedRecruitmentId(recruitmentId);
    setAlertModalState({
      modalTitle: '봉사자 모집 마감',
      modalContent: '봉사자 모집을 마감할까요?',
      btnTitle: '마감하기',
      onClick: closeRecruitment,
    });
    onOpen();
  };

  const deleteRecruitment = () => {
    // TODO: 봉사자 모집글 삭제 API 호출
    // deleteRecruitment(selectedRecruitmentId);
    console.log('deleteRecruitment', selectedRecruitmentId);
    onClose();
  };

  const confirmRecruitmentDelete = (recruitmentId: number) => {
    setSelectedRecruitmentId(recruitmentId);
    setAlertModalState({
      modalTitle: '봉사자 모집글 삭제',
      modalContent: '봉사자 모집글을 삭제할까요?',
      btnTitle: '삭제하기',
      onClick: deleteRecruitment,
    });
    onOpen();
  };

  return {
    goVolunteersDetail,
    goManageApplyPage,
    goManageAttendancePage,
    goUpdatePage,
    confirmRecruitmentClose,
    closeRecruitment,
    confirmRecruitmentDelete,
    deleteRecruitment,
    alertModalState,
    isModalOpen: isOpen,
    onCloseModal: onClose,
  };
};
