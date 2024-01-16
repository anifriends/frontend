import { FlexProps } from '@chakra-ui/react';

import type { InfoTextItemProps } from '.';
import { InfoList, InfoTextItem } from '.';

type InfoTextListProps = {
  infoTextItems: InfoTextItemProps[];
} & Omit<FlexProps, 'children'>;

export function InfoTextList({ infoTextItems, ...props }: InfoTextListProps) {
  return (
    <InfoList {...props}>
      {infoTextItems.map((infoTextItemProps, index) => (
        <InfoTextItem key={index} {...infoTextItemProps} />
      ))}
    </InfoList>
  );
}
