import NoImage from '@anifriends/assets/icon_no_image.svg';
import {
  ApplicantStatus,
  InfoSubtext,
  Label,
  LabelText,
} from '@anifriends/components';
import { AspectRatio, Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { MouseEvent } from 'react';

type Recruitment = {
  id: number;
  title: string;
  shelterName: string;
  shelterProfileImage: string;
  isRecruitmentClosed: boolean;
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
    isRecruitmentClosed,
    volunteerDate,
    volunteerDateDday,
    applicantCount,
    recruitmentCapacity,
  } = recruitment;

  return (
    <Flex
      data-id={id}
      p={4}
      gap={3}
      borderBottom="1px"
      borderColor="gray.200"
      onClick={onClickItem}
    >
      <AspectRatio minW="110px" ratio={1}>
        <Image
          as="img"
          src={shelterProfileImage}
          borderRadius={10}
          fallbackSrc={NoImage}
        />
      </AspectRatio>
      <Box w="full" pos="relative">
        <VStack w="full" align="start" gap={1}>
          {isRecruitmentClosed ? (
            <Label type="GRAY" labelTitle="마감완료" />
          ) : (
            <LabelText
              type="GREEN"
              content={`D-${volunteerDateDday}`}
              labelTitle="모집중"
            />
          )}
          <Text fontWeight="bold" lineHeight={6}>
            {title}
          </Text>
          <Text color="gray.400" fontSize="xs" lineHeight={4}>
            {shelterName}
          </Text>
          <InfoSubtext title="봉사일" content={volunteerDate} />
        </VStack>
        <Box pos="absolute" right={0} bottom={0}>
          <ApplicantStatus
            numerator={applicantCount}
            denominator={recruitmentCapacity}
          />
        </Box>
      </Box>
    </Flex>
  );
}
