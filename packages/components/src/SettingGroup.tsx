import { Box, Text } from '@chakra-ui/react';

import type { SettingItemProps } from '.';
import { SettingItem } from '.';

type SettingProps = {
  groupTitle: string;
  settingItems: SettingItemProps[];
};

export function SettingGroup({ groupTitle, settingItems }: SettingProps) {
  return (
    <Box>
      <Text pb={2} pl={4} fontSize="sm" color="gray.500">
        {groupTitle}
      </Text>
      {settingItems.map((item, index) => (
        <SettingItem key={index} {...item} />
      ))}
    </Box>
  );
}
