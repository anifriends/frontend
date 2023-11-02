import { HStack, Text } from '@chakra-ui/react';

import type { LabelProps } from './Label';
import Label from './Label';

type LabelTextProps = { content: string } & LabelProps;

export default function LabelText({ labelTitle, content }: LabelTextProps) {
  return (
    <HStack spacing="0.5rem">
      <Label labelTitle={labelTitle} />
      <Text fontSize="sm">{content}</Text>
    </HStack>
  );
}
