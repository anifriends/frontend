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
import { useMutation } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertModal from 'shared/components/AlertModal';
import ImageCarousel from 'shared/components/ImageCarousel';
import InfoTextList from 'shared/components/InfoTextList';
import Label from 'shared/components/Label';
import LabelText from 'shared/components/LabelText';
import useDetailHeaderStore from 'shared/store/detailHeaderStore';
import {
  createFormattedTime,
  createWeekDayLocalString,
  getDDay,
} from 'shared/utils/date';

import {
  closeShelterRecruitment,
  deleteShelterRecruitment,
} from '@/apis/recruitment';

import useGetVolunteerDetail from './_hooks/useGetVolunteerDetail';

const handleDeletePost = (postId: number) => {
  deleteShelterRecruitment(postId);
};

function VolunteersDetail() {
  const setOnDelete = useDetailHeaderStore((state) => state.setOnDelete);

  const toast = useToast();
  useEffect(() => {
    setOnDelete(handleDeletePost);

    return () => {
      setOnDelete(() => {});
    };
  }, [setOnDelete]);

  const navigate = useNavigate();
  const { id } = useParams();
  const recruitmentId = Number(id);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: recruitment } = useGetVolunteerDetail(recruitmentId);

  const { mutate: closedRecruitment } = useMutation({
    mutationFn: async (recruitmentId: number) =>
      closeShelterRecruitment(recruitmentId),
    onSuccess: () => {
      toast({
        position: 'top',
        description: '모집마감되었습니다.',
        status: 'success',
        duration: 1500,
      });
      setIsClosed(true);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const startDate = new Date(recruitment.startTime);
  const deadline = new Date(recruitment.deadline);
  const createdAt = new Date(recruitment.createdAt);
  const volunteerDateDay = getDDay(recruitment.deadline);

  const volunteerDate = createFormattedTime(startDate);
  const volunteerDay = createWeekDayLocalString(startDate);

  const deadlineDate = createFormattedTime(deadline);
  const deadlineDay = createWeekDayLocalString(deadline);

  const [isClosed, setIsClosed] = useState(
    recruitment.isClosed || volunteerDateDay < 0,
  );

  const goManageApply = () => navigate(`/manage/apply/${recruitmentId}`);
  const goManageAttendance = () =>
    navigate(`/manage/attendance/${recruitmentId}`);
  const onCloseRecruitment = (recruitmentId: number) => {
    closedRecruitment(recruitmentId);
    onClose();
  };

  return (
    <Box>
      {recruitment.imageUrls.length > 0 && (
        <ImageCarousel imageUrls={recruitment.imageUrls} />
      )}
      <VStack spacing="5px" align="flex-start" p={4}>
        {isClosed ? (
          <Label labelTitle="마감완료" type="GRAY" />
        ) : (
          <LabelText
            labelTitle="모집중"
            content={`D-${volunteerDateDay === 0 ? 'Day' : volunteerDateDay}`}
          />
        )}
        <Text fontSize="xl" fontWeight="semibold">
          {recruitment.title}
        </Text>
        <Text fontSize="sm" fontWeight="normal" color="gray.500">
          작성일 | {createFormattedTime(createdAt)}
          {recruitment.createdAt && ' (수정됨)'}
        </Text>
      </VStack>
      <Divider />

      <InfoTextList
        infoTextItems={[
          {
            title: '모집 인원',
            content: `${recruitment.applicant}명 / ${recruitment.capacity}명`,
          },
          { title: '봉사일', content: volunteerDate + `(${volunteerDay})` },
          {
            title: '봉사 시간',
            content: `${createFormattedTime(
              startDate,
              'hh:mm',
            )}~${createFormattedTime(new Date(recruitment.endTime), 'hh:mm')}`,
          },
          { title: '마감일', content: deadlineDate + `(${deadlineDay})` },
        ]}
      />
      <Divider />
      <Text fontWeight="medium" px={4} pt={6} mb="68px" wordBreak="keep-all">
        {recruitment.content}
      </Text>

      <HStack px={4} w="100%" pos="absolute" bottom="10px" left={0} spacing={5}>
        {isClosed ? (
          <Button
            onClick={goManageAttendance}
            size="md"
            color="white"
            bgColor="orange.400"
            w="100%"
            _active={{ bg: undefined }}
            _hover={{ bg: undefined }}
          >
            출석 관리
          </Button>
        ) : (
          <>
            <Button
              onClick={goManageApply}
              size="md"
              color="orange.400"
              bgColor="white"
              border="1.5px solid"
              borderColor="orange.400"
              w="100%"
              _active={{ bg: undefined }}
              _hover={{ bg: undefined }}
            >
              신청 현황
            </Button>
            <Button
              onClick={onOpen}
              size="md"
              color="white"
              bgColor="orange.400"
              w="100%"
              _active={{ bg: undefined }}
              _hover={{ bg: undefined }}
            >
              마감 하기
            </Button>
          </>
        )}
      </HStack>
      <AlertModal
        modalTitle="봉사자 모집 마감"
        modalContent="봉사자 모집을 마감하시겠습니까?"
        btnTitle="마감하기"
        isOpen={isOpen}
        onClose={onClose}
        onClick={() => onCloseRecruitment(recruitmentId)}
      />
    </Box>
  );
}

export default function VolunteersDetailPage() {
  return (
    <Suspense fallback={<p>봉사 상세 페이지 로딩 중...</p>}>
      <VolunteersDetail />
    </Suspense>
  );
}
