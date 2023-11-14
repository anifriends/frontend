import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from 'shared/components/ImageCarousel';
import InfoTextList from 'shared/components/InfoTextList';
import { LabelProps } from 'shared/components/Label';
import LabelText from 'shared/components/LabelText';
import useDetailHeaderStore from 'shared/store/detailHeaderStore';

import AlertModal from './AlertModal';

const handleDeletePost = (postId: number) => {
  // TODO: VolunteerPost delete API 호출
  console.log('[Delete Volunteer] postId:', postId);
};

export default function VolunteersDetailPage() {
  const setOnDelete = useDetailHeaderStore((state) => state.setOnDelete);
  const postId = 5;
  useEffect(() => {
    setOnDelete(handleDeletePost);

    return () => {
      setOnDelete(() => {});
    };
  }, [setOnDelete]);

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [label, setLabel] = useState<LabelProps>({
    labelTitle: '모집 중',
    type: 'GREEN',
  });
  const [isClosed, setIsClosed] = useState(false);

  const goManageApply = () => navigate(`/manage/apply/${postId}`);
  const goManageAttendance = () => navigate(`/manage/attendance/${postId}`);
  const onVolunteerDeadline = () => {
    onClose();
    //TODO label type gray로 변경
    setLabel({ labelTitle: '모집 마감', type: 'ORANGE' });
    setIsClosed(!isClosed);
  };

  return (
    <Box>
      <ImageCarousel
        imageUrls={[
          'https://images.unsplash.com/photo-1682686578456-69ae00b0ecbd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1699031153161-b719847e2607?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]}
      />
      <VStack spacing="5px" align="flex-start" p={4}>
        <LabelText labelTitle={label.labelTitle} content="D-12" />
        <Text fontSize="xl" fontWeight="semibold">
          강아지 목욕 봉사자를 모집합니다!
        </Text>
        <Text fontSize="sm" fontWeight="normal" color="gray.500">
          작성일 | 2023.10.23(수정됨)
        </Text>
      </VStack>
      <Divider />

      <InfoTextList
        infoTextItems={[
          { title: '모집 인원', content: '2명 / 6명' },
          { title: '봉사일', content: '2023.10.31(화)' },
          { title: '봉사 시간', content: '14:00 ~ 16:00' },
          { title: '마감일', content: '2023.10.28(토) 17:00' },
        ]}
      />
      <Divider />
      <Text fontWeight="medium" px={4} pt={6} mb="68px">
        강아지 봉사자를 모집합니다~~~강아지 봉사자를 모집합니다~~~강아지
        봉사자를 모집합니다~~~강아지 봉사자를 모집합니다~~~강아지 봉사자를
        모집합니다~~~
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
        isOpen={isOpen}
        onClose={onClose}
        onClick={onVolunteerDeadline}
      />
    </Box>
  );
}
