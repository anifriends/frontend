import { FlexProps } from '@chakra-ui/react';

import InfoList from './InfoList';
import type { InfoTextItemProps } from './InfoTextItem';
import InfoTextItem from './InfoTextItem';

type InfoTextListProps = {
  infoTextItems: InfoTextItemProps[];
} & Omit<FlexProps, 'children'>;

export default function InfoTextList({
  infoTextItems,
  ...props
}: InfoTextListProps) {
  return (
    <InfoList {...props}>
      {infoTextItems.map((infoTextItemProps, index) => (
        <InfoTextItem key={index} {...infoTextItemProps} />
      ))}
    </InfoList>
  );
}
