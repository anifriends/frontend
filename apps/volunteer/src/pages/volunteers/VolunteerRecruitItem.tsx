import {
  AspectRatio,
  Box,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import ApplicantStatus from 'shared/components/ApplicantStatus';
import InfoSubText from 'shared/components/InfoSubtext';
import LabelText from 'shared/components/LabelText';

const DUMMY_IMAGE = 'https://source.unsplash.com/random';

export default function VolunteerRecruitItem() {
  return (
    <Box p={4} borderBottom="1px" borderColor="gray.200">
      <HStack spacing={3} justifyContent="center">
        <AspectRatio minW="110px" ratio={1}>
          <Image src={DUMMY_IMAGE} borderRadius="0.625rem" />
        </AspectRatio>
        <VStack spacing={2.5} w="full">
          <Box w="full">
            <LabelText content="D-12" labelTitle="모집중" />
            <Text fontWeight="bold" lineHeight="base">
              봉사자 모집합니다!!
            </Text>
            <Text color="gray.400" fontSize="xs" lineHeight={4}>
              양천구 보건소
            </Text>
            <InfoSubText title="봉사일" content="23.10.23" />
          </Box>
          <Box alignSelf="flex-end" lineHeight="none">
            <ApplicantStatus numerator={2} denominator={6} />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
}
