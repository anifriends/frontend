import { Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Next from '../assets/icon_next.svg';

export type SettingItemProps = {
  itemTitle: string;
  path: string;
};
export default function SettingItem({ itemTitle, path }: SettingItemProps) {
  return (
    <Flex
      justify="space-between"
      py="18px"
      pl="5px"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Text fontWeight="medium">{itemTitle}</Text>
      <Link to={path}>
        <Image src={Next} cursor="pointer" />
      </Link>
    </Flex>
  );
}
