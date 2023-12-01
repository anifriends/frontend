import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertModal from 'shared/components/AlertModal';
import ImageCarousel from 'shared/components/ImageCarousel';
import InfoTextList from 'shared/components/InfoTextList';
import Label from 'shared/components/Label';
import LabelText from 'shared/components/LabelText';
import ProfileInfo from 'shared/components/ProfileInfo';
import useAuthStore from 'shared/store/authStore';
import {
  createFormattedTime,
  createWeekDayLocalString,
  getDDay,
} from 'shared/utils/date';

import { applyRecruitments } from '@/apis/recruitment';

import useFetchVolunteerDetail from './_hooks/useFetchRecruitmentDetail';
import useFetchSimpleShelterInfo from './_hooks/useFetchSimpleShelterInfo';

function VolunteersDetail() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { id } = useParams<{ id: string }>();
  const recruitmentId = Number(id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [alertModalState, setAlertModalState] = useState({
    modalTitle: '',
    modalContent: '',
    btnTitle: '',
    onClick: () => {},
  });

  useEffect(() => {
    if (!user) {
      setAlertModalState({
        modalTitle: '로그인 하기',
        modalContent: '로그인 하시겠습니까?',
        btnTitle: '로그인 하기',
        onClick: goLogInPage,
      });
    } else {
      setAlertModalState({
        modalTitle: '봉사 신청',
        modalContent: '봉사를 신청하시겠습니까?',
        btnTitle: '신청하기',
        onClick: onApplyRecruitment,
      });
    }
  }, [user]);

  const [
    { data },
    {
      data: { isAppliedRecruitment },
    },
  ] = useFetchVolunteerDetail(recruitmentId);

  const [isApplied, setIsApplied] = useState(isAppliedRecruitment);

  const volunteerDay = new Date(data.recruitmentStartTime);
  const deadline = new Date(data.recruitmentDeadline);
  const createdAt = new Date(data.recruitmentCreatedAt);
  const volunteerDateDay = getDDay(data.recruitmentDeadline);

  const [isRecruitmentClosed, setIsRecruitmentClosed] = useState(
    data.recruitmentIsClosed || volunteerDateDay < 0,
  );

  const queryClient = useQueryClient();

  const { data: shelter } = useFetchSimpleShelterInfo(data.shelterId);

  const { mutate: applyRecruitment } = useMutation({
    mutationFn: async () => await applyRecruitments(recruitmentId),
    onSuccess: () => {
      queryClient.setQueryData(['recruitment', recruitmentId, 'isApplied'], {
        isAppliedRecruitment: true,
      });
      setIsApplied(true);
      toast({
        position: 'top',
        description: '봉사 신청이 완료되었습니다.',
        status: 'success',
        duration: 1500,
      });
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        toast({
          position: 'top',
          description: '봉사 모집이 마감되었습니다.',
          status: 'error',
          duration: 1500,
        });
        setIsRecruitmentClosed(!isRecruitmentClosed);
      }
    },
  });

  const goShelterProfilePage = () => {
    navigate(`/shelters/profile/${data.shelterId}`);
  };

  const goLogInPage = () => {
    navigate('/signin');
  };

  const onApplyRecruitment = () => {
    onClose();
    applyRecruitment();
  };

  return (
    <Box pb={118}>
      <ImageCarousel imageUrls={data.recruitmentImageUrls} />
      <VStack spacing="5px" align="flex-start" p={4}>
        {isRecruitmentClosed ? (
          <Label labelTitle="마감완료" type="GRAY" />
        ) : (
          <LabelText
            labelTitle="모집중"
            content={`D-${volunteerDateDay === 0 ? 'Day' : volunteerDateDay}`}
          />
        )}
        <Text fontSize="xl" fontWeight="semibold">
          {data.recruitmentTitle}
        </Text>
        <Text fontSize="sm" fontWeight="normal" color="gray.500">
          작성일 | {createFormattedTime(createdAt)}
          {data.recruitmentUpdatedAt && ' (수정됨)'}
        </Text>
      </VStack>

      <InfoTextList
        infoTextItems={[
          {
            title: '모집 인원',
            content: `${data.recruitmentApplicantCount}명 / ${data.recruitmentCapacity}명`,
          },
          {
            title: '봉사일',
            content:
              createFormattedTime(volunteerDay, 'YY.MM.DD') +
              `(${createWeekDayLocalString(volunteerDay)})`,
          },
          {
            title: '봉사 시간',
            content: `${createFormattedTime(
              volunteerDay,
              'hh:mm',
            )} ~ ${createFormattedTime(
              new Date(data.recruitmentEndTime),
              'hh:mm',
            )}`,
          },
          {
            title: '마감일',
            content:
              createFormattedTime(deadline) +
              `(${createWeekDayLocalString(deadline)}) ` +
              createFormattedTime(deadline, 'hh:mm'),
          },
        ]}
      />

      <Text fontWeight="medium" px={4} py={6} wordBreak="keep-all">
        {data.recruitmentContent}
      </Text>
      <Divider />
      <Box cursor="pointer" onClick={goShelterProfilePage}>
        <ProfileInfo
          infoImage={shelter.shelterImageUrl}
          infoTitle={shelter.shelterName}
          infoTexts={[shelter.shelterEmail, shelter.shelterAddress]}
        />
      </Box>
      <Divider />

      <HStack
        px={4}
        w="100%"
        pos="absolute"
        bottom="10px"
        left={0}
        spacing={5}
        backgroundColor="white"
      >
        <Button
          onClick={onOpen}
          size="md"
          color="white"
          bgColor="orange.400"
          w="100%"
          _active={{ bg: undefined }}
          _hover={{ bg: undefined }}
          isDisabled={isRecruitmentClosed || isApplied}
        >
          {isRecruitmentClosed
            ? '모집마감'
            : isApplied
            ? '신청완료'
            : '신청하기'}
        </Button>
      </HStack>
      <AlertModal {...alertModalState} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default function VolunteersDetailPage() {
  return (
    <Suspense>
      <VolunteersDetail />
    </Suspense>
  );
}
