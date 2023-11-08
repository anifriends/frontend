import type { FlexProps, TextProps } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

export type InfoItemStylesProps = {
  flexStyles: FlexProps;
  titleTextStyles: TextProps;
};

type InfoItemWithoutStylesProps = {
  title: string;
  children: ReactElement;
};

export type InfoItemProps = Partial<InfoItemStylesProps> &
  InfoItemWithoutStylesProps;

export default function InfoItem({
  title,
  children,
  flexStyles,
  titleTextStyles,
}: InfoItemProps) {
  return (
    <Flex gap={1} align="center" {...flexStyles}>
      <Text
        color="gray.400"
        size="md"
        fontWeight="medium"
        fontSize="xs"
        {...titleTextStyles}
      >
        {title}
      </Text>
      {children}
    </Flex>
  );
}
