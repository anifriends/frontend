import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import ImageCarousel from 'shared/components/ImageCarousel';
import InfoList from 'shared/components/InfoList';
import InfoTextItem from 'shared/components/InfoTextItem';
import LabelText from 'shared/components/LabelText';
import useDetailHeaderStore from 'shared/store/detailHeaderStore';

const handleDeletePost = (postId: number) => {
  // TODO: VolunteerPost delete API 호출
  console.log('[Delete Volunteer] postId:', postId);
};

export default function VolunteersDetailPage() {
  const setOnDelete = useDetailHeaderStore((state) => state.setOnDelete);

  useEffect(() => {
    setOnDelete(handleDeletePost);

    return () => {
      setOnDelete(() => {});
    };
  }, [setOnDelete]);

  const imageUrls = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <Box>
      <ImageCarousel imageUrls={imageUrls} />
      <VStack spacing="5px" align="flex-start" p={4}>
        <LabelText labelTitle="모집중" content="D-12" />
        <Text fontSize="xl" fontWeight="semibold">
          개 씻겨주실 봉사자 모집합니다!!
        </Text>
        <Text fontSize="sm" fontWeight="normal" color="gray.500">
          작성일 | 2023.10.23 (수정됨)
        </Text>
      </VStack>
      <Divider />
      <InfoList>
        <InfoTextItem title="모집 인원" content="2명 / 6명" />
        <InfoTextItem title="봉사일" content="2023.10.31(화)" />
        <InfoTextItem title="봉사 시간" content="14:00 ~ 16:00" />
        <InfoTextItem title="마감일" content="2023.10.28(토) 17:00" />
      </InfoList>
      <Divider />
      <Text fontWeight="medium" px={4} pt={6} mb="68px">
        저희 보호소에 와서 청소봉사 해주실 분 구합니다!!저희 보호소에 와서
        청소봉사 해주실 분 구합니다!!저희 보호소에 와서 청소봉사 해주실 분
        구합니다!!저희 보호소에 와서 청소봉사 해주실 분 구합니다!!저희 보호소에
        와서 청소봉사 해주실 분 구합니다!!
      </Text>
      <HStack px={4} pos="fixed" w="100%" bottom="10px" spacing={5}>
        <Button
          size="md"
          color="orange.400"
          bgColor="white"
          border="1.5px solid"
          borderColor="orange.400"
          flex={1}
          _active={{ bg: undefined }}
          _hover={{ bg: undefined }}
        >
          신청 현황
        </Button>
        <Button
          size="md"
          color="white"
          bgColor="orange.400"
          flex={1}
          _active={{ bg: undefined }}
          _hover={{ bg: undefined }}
        >
          마감 하기
        </Button>
      </HStack>
    </Box>
  );
}
