import type { TextProps } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

export type InfoItemStylesProps = {
  titleTextStyles?: TextProps;
};

export type InfoItemProps = {
  title: string;
  children: ReactElement;
};

export default function InfoItem({
  title,
  titleTextStyles,
  children,
}: InfoItemProps & InfoItemStylesProps) {
  return (
    <Flex gap="2rem" align="center">
      <Text
        w="6rem"
        color="gray.500"
        fontSize="sm"
        fontWeight="normal"
        {...titleTextStyles}
      >
        {title}
      </Text>
      {children}
    </Flex>
  );
}
