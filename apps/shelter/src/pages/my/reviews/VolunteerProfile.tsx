import NextIcon from '@anifriends/assets/icon_review_next.svg';
import { InfoSubtext, Label } from '@anifriends/components';
import { Avatar, Box, HStack, Image, Text } from '@chakra-ui/react';

type VolunteerProfileprops = {
  volunteerName: string;
  volunteerTempature: number;
  volunteerReviewCount: number;
  volunteerImageUrl: string;
  reviewCreatedAt: string;
  onClickNextButton: VoidFunction;
};

export default function VolunteerProfile({
  volunteerName,
  volunteerTempature,
  volunteerReviewCount,
  volunteerImageUrl,
  reviewCreatedAt,
  onClickNextButton,
}: VolunteerProfileprops) {
  return (
    <HStack spacing={2.5}>
      <Avatar src={volunteerImageUrl} boxSize="34px" />
      <Box>
        <HStack spacing={0}>
          <Text fontWeight="semibold" lineHeight="tall">
            {volunteerName}
          </Text>
          <Box as="button" boxSize={6} minW={6} onClick={onClickNextButton}>
            <Image src={NextIcon} w="full" h="full" />
          </Box>
          <InfoSubtext title="리뷰" content={volunteerReviewCount.toString()} />
        </HStack>
        <HStack spacing={2}>
          <Label labelTitle={`${volunteerTempature}°C`} />
          <InfoSubtext title="작성일" content={reviewCreatedAt} />
        </HStack>
      </Box>
    </HStack>
  );
}
