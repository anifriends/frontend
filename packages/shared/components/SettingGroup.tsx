import { Box, Text } from '@chakra-ui/react';

import type { SettingItemProps } from './SettingItem';
import SettingItem from './SettingItem';

type SettingProps = {
  groupTitle: string;
  settingItems: SettingItemProps[];
};

export default function SettingGroup({
  groupTitle,
  settingItems,
}: SettingProps) {
  return (
    <Box>
      <Text pb={2} color="gray.500">
        {groupTitle}
      </Text>
      {settingItems.map((item, index) => (
        <SettingItem key={index} {...item} />
      ))}
    </Box>
  );
}
