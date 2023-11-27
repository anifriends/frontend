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
import { useNavigate, useParams } from 'react-router-dom';
import AlertModal from 'shared/components/AlertModal';
import ImageCarousel from 'shared/components/ImageCarousel';
import InfoTextList from 'shared/components/InfoTextList';
import { LabelProps } from 'shared/components/Label';
import LabelText from 'shared/components/LabelText';
import ProfileInfo from 'shared/components/ProfileInfo';
import { getDDay } from 'shared/utils/date';

const DUMMY_DATA = {
  imageUrls: [
    'https://source.unsplash.com/random/?animal',
    'https://source.unsplash.com/random/300X500',
  ],
  title: '강아지 봉사자를 모집합니다',
  content: '강아지 목욕봉사입니다.',
  applicant: 5,
  capacity: 10,
  volunteerDay: '2023.12.24',
  recruitmentDeadline: '2023.12.03',
  volunteerStartTime: '14:00',
  volunteerEndTime: '16:00',
  recruitmentCreatedAt: '2023.11.25',
  recruitmentIsClosed: true,
};

const DUMMY_SHELTERINFO = {
  name: '양천구 보호소',
  profileImage: 'https://source.unsplash.com/random/?animal',
  address: '경기도 남양주시',
  email: 'asdf@naver.com',
};

export default function VolunteersDetailPage() {
  const navigate = useNavigate();
  const { id: recruitmentId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [label, setLabel] = useState<LabelProps>({
    labelTitle: '모집중',
    type: 'GREEN',
  });
  const {
    imageUrls,
    title,
    content,
    applicant,
    capacity,
    volunteerDay,
    recruitmentDeadline,
    volunteerStartTime,
    volunteerEndTime,
    recruitmentCreatedAt,
    recruitmentIsClosed,
  } = DUMMY_DATA;

  const { name, profileImage, address, email } = DUMMY_SHELTERINFO;

  useEffect(() => {
    if (recruitmentIsClosed) {
      setLabel({ labelTitle: '마감완료', type: 'GRAY' });
    }
  }, [recruitmentIsClosed]);

  const goChatting = () => {
    //TODO 채팅방 생성 API
    navigate(`/chattings/${recruitmentId}`);
  };

  const onApplyRecruitment = () => {
    onClose();
    //TODO 봉사신청완료 toast
  };

  return (
    <Box pb={118}>
      <ImageCarousel imageUrls={imageUrls} />
      <VStack spacing="5px" align="flex-start" p={4}>
        <LabelText
          labelTitle={label.labelTitle}
          type={label.type}
          content={`D-${getDDay(recruitmentDeadline)}`}
        />
        <Text fontSize="xl" fontWeight="semibold">
          {title}
        </Text>
        <Text fontSize="sm" fontWeight="normal" color="gray.500">
          작성일 | {recruitmentCreatedAt}(수정됨)
        </Text>
      </VStack>

      <InfoTextList
        infoTextItems={[
          { title: '모집 인원', content: `${applicant}명 / ${capacity}명` },
          { title: '봉사일', content: volunteerDay },
          {
            title: '봉사 시간',
            content: `${volunteerStartTime}~${volunteerEndTime}`,
          },
          { title: '마감일', content: recruitmentDeadline },
        ]}
      />

      <Text fontWeight="medium" px={4} py={6} wordBreak="keep-all">
        {content}
      </Text>
      <Divider />
      <ProfileInfo
        infoImage={profileImage}
        infoTitle={name}
        infoTexts={[email, address]}
      />
      <Divider />

      <HStack px={4} w="100%" pos="absolute" bottom="10px" left={0} spacing={5}>
        <Button
          onClick={goChatting}
          size="md"
          color="orange.400"
          bgColor="white"
          border="1.5px solid"
          borderColor="orange.400"
          w="100%"
          _active={{ bg: undefined }}
          _hover={{ bg: undefined }}
        >
          채팅하기
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
          신청하기
        </Button>
      </HStack>
      <AlertModal
        modalTitle="봉사 신청"
        modalContent="봉사를 신청하시겠습니까?"
        btnTitle="신청하기"
        isOpen={isOpen}
        onClose={onClose}
        onClick={onApplyRecruitment}
      />
    </Box>
  );
}
