import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import InfoItem, { InfoItemStylesProps } from './InfoItem';

export type InfoTextItemStylesProps = {
  contentTextStyles?: TextProps;
} & InfoItemStylesProps;

export type InfoTextItemProps = {
  title: string;
  content: string;
};

export default function InfoTextItem({
  content,
  contentTextStyles,
  ...props
}: InfoTextItemProps & InfoTextItemStylesProps) {
  return (
    <InfoItem {...props}>
      <Text
        w="calc(100% - 8rem)"
        color="black"
        fontSize="sm"
        fontWeight="medium"
        {...contentTextStyles}
      >
        {content}
      </Text>
    </InfoItem>
  );
}
