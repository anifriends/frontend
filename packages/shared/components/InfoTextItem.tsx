import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import InfoItem, { InfoItemStylesProps } from './InfoItem';

type InfoTextItemStylesProps = {
  contentTextStyles: TextProps;
} & InfoItemStylesProps;

export type InfoTextItemWithoutStylesProps = {
  title: string;
  content: string;
};

type InfoTextItemProps = Partial<InfoTextItemStylesProps> &
  InfoTextItemWithoutStylesProps;

export default function InfoTextItem({
  content,
  contentTextStyles,
  ...props
}: InfoTextItemProps) {
  return (
    <InfoItem {...props}>
      <Text
        color="gray.500"
        size="md"
        fontWeight="semibold"
        fontSize="xs"
        {...contentTextStyles}
      >
        {content}
      </Text>
    </InfoItem>
  );
}
