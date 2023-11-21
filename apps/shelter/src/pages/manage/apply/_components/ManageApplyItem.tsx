import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Label from 'shared/components/Label';
import { PERSON_GENDER_KOR } from 'shared/constants/gender';
import { getAge } from 'shared/utils/date';

import { ShelterRecruitmentApplicant } from '@/types/apis/recruitment';

type ManageApplyItemProps = {
  applicant: ShelterRecruitmentApplicant;
};

export default function ManageApplyItem({
  applicant: {
    volunteerBirthDate,
    volunteerGender,
    volunteerName,
    volunteerTemperature,
    completedVolunteerCount,
  },
}: ManageApplyItemProps) {
  const age = getAge(volunteerBirthDate);

  return (
    <Flex
      p={4}
      justify="space-between"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <VStack spacing={1} align="flex-start">
        <HStack spacing={2}>
          <Text fontWeight="semibold">{volunteerName}</Text>
          <Label labelTitle={String(volunteerTemperature) + '°C'} />
        </HStack>
        <Text fontSize="14px">{`${age < 0 ? '00' : age}살 · ${
          PERSON_GENDER_KOR[volunteerGender]
        } · 봉사횟수 ${completedVolunteerCount}회`}</Text>
      </VStack>
      <HStack align="flex-end">
        <Button
          size="sm"
          px={6}
          border="1px solid"
          borderColor="orange.400"
          bgColor="white"
          color="orange.400"
          _hover={{ bg: undefined }}
          _active={{ bg: undefined }}
        >
          거절
        </Button>
        <Button
          size="sm"
          px={6}
          border="1px solid"
          borderColor="orange.400"
          bgColor="white"
          color="orange.400"
          _hover={{ bg: undefined }}
          _active={{ bg: undefined }}
        >
          승인
        </Button>
      </HStack>
    </Flex>
  );
}
