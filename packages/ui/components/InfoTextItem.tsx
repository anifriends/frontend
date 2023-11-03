import type { ColorProps } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';

type InfoTextItemStylesProps = {
  titleColor: ColorProps['color'];
  contentColor: ColorProps['color'];
};

export type InfoTextItemPropsWithoutStyles = {
  title: string;
  content: string;
  isList?: boolean;
};

type InfoTextItemProps = InfoTextItemStylesProps &
  InfoTextItemPropsWithoutStyles;

export default function InfoTextItem({
  title,
  content,
  titleColor,
  contentColor,
  isList = false,
}: InfoTextItemProps) {
  return (
    <Flex minH={5} gap={isList ? '5%' : 1}>
      <Text
        w={isList ? '25%' : undefined}
        color={titleColor}
        size="md"
        fontWeight={isList ? 'normal' : 'medium'}
        fontSize={isList ? 'sm' : 'xs'}
      >
        {title}
      </Text>
      <Text
        w={isList ? '70%' : undefined}
        color={contentColor}
        size="md"
        fontWeight={isList ? 'medium' : 'semibold'}
        fontSize={isList ? 'sm' : 'xs'}
      >
        {content}
      </Text>
    </Flex>
  );
}
