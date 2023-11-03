import { Box } from '@chakra-ui/react';

import type { InfoTextItemPropsWithoutStyles } from './InfoTextItem';
import InfoTextItem from './InfoTextItem';

type InfoTextListProps = {
  infoTextItems: InfoTextItemPropsWithoutStyles[];
};

export default function InfoTextList({ infoTextItems }: InfoTextListProps) {
  return (
    <Box py={6} borderBottom="1px solid" borderColor="gray.200">
      {infoTextItems.map((infoTextItem, index) => (
        <InfoTextItem
          key={index}
          titleColor="gray.500"
          contentColor="black"
          {...infoTextItem}
          isList
        />
      ))}
    </Box>
  );
}
