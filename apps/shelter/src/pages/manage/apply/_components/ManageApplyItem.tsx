import { Button, Flex, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Label from 'shared/components/Label';
import { PERSON_GENDER_KOR } from 'shared/constants/gender';
import { getAge } from 'shared/utils/date';
import { updateToast } from 'shared/utils/toast';

import { updateShelterRecruitmentApplicant } from '@/apis/recruitment';
import CkCheck from '@/assets/CkCheck';
import CkClose from '@/assets/CkClose';
import {
  APPLICANT_STATUS_ENG,
  APPLICANT_STATUS_KOR,
} from '@/constants/recruitment';
import type {
  RecruitmentApplicantUpdateRequest,
  ShelterRecruitmentApplicant,
} from '@/types/apis/recruitment';

type ManageApplyItemProps = {
  recruitmentId: number;
  applicant: ShelterRecruitmentApplicant;
};

export default function ManageApplyItem({
  recruitmentId,
  applicant: {
    applicantId,
    applicantStatus,
    volunteerBirthDate,
    volunteerGender,
    volunteerName,
    volunteerTemperature,
    completedVolunteerCount,
  },
}: ManageApplyItemProps) {
  const toast = useToast();
  const manageApplyId = 'manage-apply';
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: RecruitmentApplicantUpdateRequest) =>
      updateShelterRecruitmentApplicant(recruitmentId, applicantId, data),
    onSuccess: async (_, { isApproved }) => {
      await queryClient.invalidateQueries({
        queryKey: ['recruitment', 'manage', 'apply', recruitmentId],
      });

      const descriptionStatus = isApproved
        ? APPLICANT_STATUS_KOR.APPROVE
        : APPLICANT_STATUS_KOR.REFUSE;

      toast.close(manageApplyId);

      await new Promise((resolve) => setTimeout(resolve, 200));

      updateToast({
        toast,
        toastId: manageApplyId,
        toastOptions: {
          position: 'top',
          description: (
            <Text w="100%">
              <Text as="span" fontWeight="bold">
                {volunteerName}
              </Text>
              님의 신청을{` `}
              <Text as="span" fontWeight="bold">
                {descriptionStatus}
              </Text>
              했습니다
            </Text>
          ),
          status: 'success',
          duration: 1500,
          isClosable: true,
        },
      });
    },
    onError: async (error) => {
      toast.close(manageApplyId);

      await new Promise((resolve) => setTimeout(resolve, 200));

      updateToast({
        toast,
        toastId: manageApplyId,
        toastOptions: {
          position: 'top',
          description: (
            <Text>
              <Text as="span" fontWeight="bold">
                {volunteerName}
              </Text>
              님은 {error.response?.data.message}
            </Text>
          ),
          status: 'error',
          duration: 1500,
          isClosable: true,
        },
      });
    },
  });

  const age = getAge(volunteerBirthDate);
  const isRefused = applicantStatus === APPLICANT_STATUS_ENG.REFUSED;
  const isApproved = applicantStatus === APPLICANT_STATUS_ENG.APPROVED;

  const changeApplicantStatus = ({
    isApproved,
  }: RecruitmentApplicantUpdateRequest) => {
    if (
      (isApproved && applicantStatus === APPLICANT_STATUS_ENG.APPROVED) ||
      (!isApproved && applicantStatus === APPLICANT_STATUS_ENG.REFUSED)
    ) {
      return;
    }

    mutate({ isApproved });
  };

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
          px={isRefused ? 3 : 6}
          border="1px solid"
          borderColor="orange.400"
          bgColor={isRefused ? 'orange.400' : 'white'}
          color={isRefused ? 'white' : 'orange.400'}
          _hover={{ bg: undefined }}
          _active={{ bg: undefined }}
          onClick={() => changeApplicantStatus({ isApproved: false })}
        >
          {isRefused
            ? APPLICANT_STATUS_KOR.REFUSED
            : APPLICANT_STATUS_KOR.REFUSE}
          {isRefused && <CkClose />}
        </Button>
        <Button
          size="sm"
          px={isApproved ? 3 : 6}
          border="1px solid"
          borderColor="orange.400"
          bgColor={isApproved ? 'orange.400' : 'white'}
          color={isApproved ? 'white' : 'orange.400'}
          _hover={{ bg: undefined }}
          _active={{ bg: undefined }}
          onClick={() => changeApplicantStatus({ isApproved: true })}
        >
          {isApproved
            ? APPLICANT_STATUS_KOR.APPROVED
            : APPLICANT_STATUS_KOR.APPROVE}
          {isApproved && <CkCheck />}
        </Button>
      </HStack>
    </Flex>
  );
}
