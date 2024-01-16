import { HStack, Text } from '@chakra-ui/react';

import type { LabelProps } from '.';
import { Label } from '.';

type LabelTextProps = LabelProps & {
  content: string;
};

export function LabelText({
  labelTitle,
  type,
  content,
  fontSize = 'xs',
  lineHeight = 4,
}: LabelTextProps) {
  return (
    <HStack spacing={2}>
      <Label
        labelTitle={labelTitle}
        type={type}
        fontSize={fontSize}
        lineHeight={lineHeight}
      />
      <Text
        fontSize={fontSize}
        lineHeight={lineHeight}
        textTransform="uppercase"
      >
        {content}
      </Text>
    </HStack>
  );
}
