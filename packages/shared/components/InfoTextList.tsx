import { BoxProps, Flex, FlexProps, TextProps } from '@chakra-ui/react';

import type { InfoTextItemWithoutStylesProps } from './InfoTextItem';
import InfoTextItem from './InfoTextItem';

type InfoTextListProps = {
  infoTextItems: InfoTextItemWithoutStylesProps[];
} & BoxProps;

const flexStyles: FlexProps = {
  gap: '2rem',
};

const titleTextStyles: TextProps = {
  w: '6rem',
  color: 'gray.500',
  fontWeight: 'normal',
  fontSize: 'sm',
};

const contentTextStyles: TextProps = {
  w: 'calc(100% - 8rem)',
  color: 'black',
  fontWeight: 'medium',
  fontSize: 'sm',
};

export default function InfoTextList({
  infoTextItems,
  ...props
}: InfoTextListProps) {
  return (
    <Flex
      py={6}
      px={4}
      flexDir="column"
      gap="2px"
      borderBottom="1px solid"
      borderColor="gray.200"
      {...props}
    >
      {infoTextItems.map((infoTextItem, index) => (
        <InfoTextItem
          key={index}
          flexStyles={flexStyles}
          titleTextStyles={titleTextStyles}
          contentTextStyles={contentTextStyles}
          {...infoTextItem}
        />
      ))}
    </Flex>
  );
}
