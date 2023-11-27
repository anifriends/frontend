import { Flex, Image, Text } from '@chakra-ui/react';

import ApplicantIcon from '../assets/icon_applicant.svg';

type ApplicantStatusProps = {
  size?: number;
  numerator: number;
  denominator: number;
};

export default function ApplicantStatus({
  size = 5,
  numerator,
  denominator,
}: ApplicantStatusProps) {
  return (
    <Flex align="center" gap={1} lineHeight={size}>
      <Image src={ApplicantIcon} width={size} height={size} />
      <Text color="black" fontSize="sm" fontWeight="normal">
        {`${numerator} / ${denominator}`}
      </Text>
    </Flex>
  );
}
