import { Flex, Text } from '@chakra-ui/react';
import ApplicantStatus from 'shared/components/ApplicantStatus';

type ApplyInfoItemProps = {
  currentRecuritmentCount: number;
  recruitmentCapacity: number;
};

export default function ApplyInfoBox({
  currentRecuritmentCount,
  recruitmentCapacity,
}: ApplyInfoItemProps) {
  return (
    <Flex
      p={4}
      pos="sticky"
      top={0}
      justify="space-between"
      borderBottom="1px solid"
      borderColor="gray.200"
      bgColor="white"
      zIndex={10}
    >
      <Text fontSize="sm">
        총{' '}
        <Text
          as="span"
          fontWeight="semibold"
        >{`${currentRecuritmentCount}명`}</Text>
        이 봉사를 신청했습니다
      </Text>
      <ApplicantStatus
        numerator={currentRecuritmentCount}
        denominator={recruitmentCapacity}
      />
    </Flex>
  );
}
