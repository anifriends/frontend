import { Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

import { HeaderProps } from '@/types/header';

import BackIcon from '../../assets/icon_back.svg';
import MenuIcon from '../../assets/icon_menu.svg';

export default function DetailHeader({ title, headerOption }: HeaderProps) {
  const [iconVisibility, setIconVisibility] = useState({ menuIcon: false });

  const { menuIcon } = iconVisibility;

  return (
    <Flex
      bgColor="white"
      color="black"
      fontSize="md"
      fontWeight="medium"
      borderBottom="1px solid"
      borderColor="gray.200"
      pos="sticky"
      w="100%"
      h="44px"
      justify="center"
      align="center"
      top={0}
      as="header"
    >
      <Image
        src={BackIcon}
        alt="Back Icon"
        pos="absolute"
        left="16px"
        cursor="pointer"
      />
      {title}
      {menuIcon && (
        <Image
          src={MenuIcon}
          alt="Menu Icon"
          pos="absolute"
          right="16px"
          cursor="pointer"
        />
      )}
    </Flex>
  );
}