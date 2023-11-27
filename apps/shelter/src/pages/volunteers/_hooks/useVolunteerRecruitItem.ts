import { useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  closeShelterRecruitment,
  deleteShelterRecruitment,
} from '@/apis/recruitment';

export const useVolunteerRecruitItem = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [alertModalState, setAlertModalState] = useState({
    modalTitle: '',
    modalContent: '',
    btnTitle: '',
    onClick: () => {},
  });

  const closeRecruitment = useMutation({
    mutationFn: async (recruitmentId: number) => {
      await closeShelterRecruitment(recruitmentId);
      onClose();
    },
  });

  const deleteRecruitment = useMutation({
    mutationFn: async (recruitmentId: number) => {
      await deleteShelterRecruitment(recruitmentId);
      onClose();
    },
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

  const confirmRecruitmentClose = (recruitmentId: number) => {
    setAlertModalState({
      modalTitle: '봉사자 모집 마감',
      modalContent: '봉사자 모집을 마감할까요?',
      btnTitle: '마감하기',
      onClick: () => closeRecruitment.mutate(recruitmentId),
    });
    onOpen();
  };

  const confirmRecruitmentDelete = (recruitmentId: number) => {
    setAlertModalState({
      modalTitle: '봉사자 모집글 삭제',
      modalContent: '봉사자 모집글을 삭제할까요?',
      btnTitle: '삭제하기',
      onClick: () => deleteRecruitment.mutate(recruitmentId),
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
