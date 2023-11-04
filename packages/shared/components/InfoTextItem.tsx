import type { FlexProps, TextProps } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';

type InfoTextItemStylesProps = {
  flexStyles: FlexProps;
  titleTextStyles: TextProps;
  contentTextStyles: TextProps;
};

export type InfoTextItemWithoutStylesProps = {
  title: string;
  content: string;
};

type InfoTextItemProps = Partial<InfoTextItemStylesProps> &
  InfoTextItemWithoutStylesProps;

export default function InfoTextItem({
  title,
  content,
  flexStyles,
  titleTextStyles,
  contentTextStyles,
}: InfoTextItemProps) {
  return (
    <Flex gap={1} {...flexStyles}>
      <Text
        color="gray.400"
        size="md"
        fontWeight="medium"
        fontSize="xs"
        {...titleTextStyles}
      >
        {title}
      </Text>
      <Text
        color="gray.500"
        size="md"
        fontWeight="semibold"
        fontSize="xs"
        {...contentTextStyles}
      >
        {content}
      </Text>
    </Flex>
  );
}
