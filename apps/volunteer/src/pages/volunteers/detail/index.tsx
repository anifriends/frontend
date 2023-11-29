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

import useFetchVolunteerDetail from './_hooks/useFetchVolunteerDetail';

export default function VolunteersDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const recruitmentId = Number(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [label, setLabel] = useState<LabelProps>({
    labelTitle: '모집중',
    type: 'GREEN',
  });

  const { data } = useFetchVolunteerDetail(3);

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
    shelterInfo,
  } = data;
  const { shelterName, shelterImageUrl, shelterAddress, shelterEmail } =
    shelterInfo;

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
    //TODO 봉사신청 API
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
        infoImage={shelterImageUrl}
        infoTitle={shelterName}
        infoTexts={[shelterEmail, shelterAddress]}
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
