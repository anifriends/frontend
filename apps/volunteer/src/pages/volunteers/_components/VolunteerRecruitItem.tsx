import {
  AspectRatio,
  Box,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MouseEvent } from 'react';
import ApplicantStatus from 'shared/components/ApplicantStatus';
import InfoSubText from 'shared/components/InfoSubtext';
import LabelText from 'shared/components/LabelText';

type Recruitment = {
  id: number;
  title: string;
  shelterName: string;
  shelterProfileImage: string;
  volunteerDate: string;
  volunteerDateDday: number;
  applicantCount: number;
  recruitmentCapacity: number;
};

type VolunteerRecruitItemProps = {
  recruitment: Recruitment;
  onClickItem: (event: MouseEvent<HTMLDivElement>) => void;
};

export default function VolunteerRecruitItem({
  recruitment,
  onClickItem,
}: VolunteerRecruitItemProps) {
  const {
    id,
    title,
    shelterName,
    shelterProfileImage,
    volunteerDate,
    volunteerDateDday,
    applicantCount,
    recruitmentCapacity,
  } = recruitment;

  return (
    <Box
      data-id={id}
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      onClick={onClickItem}
    >
      <HStack spacing={3} justifyContent="center">
        <AspectRatio minW="110px" ratio={1}>
          <Image src={shelterProfileImage} borderRadius={10} />
        </AspectRatio>
        <VStack spacing={2.5} w="full">
          <Box w="full">
            <LabelText content={`D-${volunteerDateDday}`} labelTitle="모집중" />
            <Text fontWeight="bold" lineHeight="base">
              {title}
            </Text>
            <Text color="gray.400" fontSize="xs" lineHeight={4}>
              {shelterName}
            </Text>
            <InfoSubText title="봉사일" content={volunteerDate} />
          </Box>
          <Box alignSelf="flex-end" lineHeight="none">
            <ApplicantStatus
              numerator={applicantCount}
              denominator={recruitmentCapacity}
            />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
}
