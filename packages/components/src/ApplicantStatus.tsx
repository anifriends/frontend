import ApplicantIcon from '@anifriends/assets/icon_applicant.svg';
import { Flex, Image, Text } from '@chakra-ui/react';

type ApplicantStatusProps = {
  size?: number;
  numerator: number;
  denominator: number;
};

export function ApplicantStatus({
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
