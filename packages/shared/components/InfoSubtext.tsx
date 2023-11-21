import { HStack, Text, TextProps } from '@chakra-ui/react';

type InfoSubtext = {
  title: string;
  content: string;
} & Pick<TextProps, 'fontSize' | 'lineHeight'>;

export default function InfoSubtext({
  title,
  content,
  fontSize = 'xs',
  lineHeight = 4,
}: InfoSubtext) {
  return (
    <HStack spacing={1}>
      <Text
        color="gray.400"
        fontSize={fontSize}
        fontWeight="medium"
        lineHeight={lineHeight}
      >
        {title}
      </Text>
      <Text
        color="gray.500"
        fontSize={fontSize}
        fontWeight="semibold"
        lineHeight={lineHeight}
      >
        {content}
      </Text>
    </HStack>
  );
}
