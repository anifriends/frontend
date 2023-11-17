import { HStack, Text } from '@chakra-ui/react';

import type { LabelProps } from './Label';
import Label from './Label';

type LabelTextProps = { content: string } & LabelProps;

export default function LabelText({
  labelTitle,
  type,
  content,
}: LabelTextProps) {
  return (
    <HStack spacing="0.5rem">
      <Label labelTitle={labelTitle} type={type} />
      <Text fontSize="sm" lineHeight={4} textTransform="uppercase">
        {content}
      </Text>
    </HStack>
  );
}
