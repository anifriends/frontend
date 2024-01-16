import Next from '@anifriends/assets/icon_next.svg';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

export type SettingItemProps = {
  itemTitle: string;
  onClick: VoidFunction;
};
export function SettingItem({ itemTitle, onClick }: SettingItemProps) {
  return (
    <Flex
      justify="space-between"
      py="18px"
      px={4}
      borderBottom="1px solid"
      borderColor="gray.200"
      onClick={onClick}
      cursor="pointer"
    >
      <Text fontWeight="medium">{itemTitle}</Text>
      <Box as="button">
        <Image src={Next} />
      </Box>
    </Flex>
  );
}
