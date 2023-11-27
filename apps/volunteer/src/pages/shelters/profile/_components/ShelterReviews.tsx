import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import InfoSubtext from 'shared/components/InfoSubtext';
import Label from 'shared/components/Label';
import ReviewItem from 'shared/components/ReviewItem';

const DUMMY_REVIEW = {
  volunteerId: 'abc***',
  temperature: 38,
  createdAt: '23.11.24',
  content: '아이들이 너무 귀여워서 봉사하는 시간이 즐거웠습니다~!',
  images: [
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
  ],
};

export default function ShelterReviews() {
  //TODO 보호소에 후기 리스트 조회 API 연결
  return (
    <Box>
      <Heading fontWeight={600} fontSize="md" py={4}>
        보호소의 후기 12개
      </Heading>
      <VStack spacing={2}>
        {Array.from({ length: 5 }, () => DUMMY_REVIEW).map((review, index) => {
          const { content, images, volunteerId, temperature, createdAt } =
            review;
          return (
            <ReviewItem key={index} content={content} images={images}>
              <Box>
                <HStack mb={1}>
                  <Text fontWeight={600}>{volunteerId}</Text>
                  <Label labelTitle={`${temperature}℃`} />
                </HStack>
                <InfoSubtext title="작성일" content={createdAt} />
              </Box>
            </ReviewItem>
          );
        })}
      </VStack>
    </Box>
  );
}
