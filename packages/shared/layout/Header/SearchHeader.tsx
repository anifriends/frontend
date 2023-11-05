import { Flex } from '@chakra-ui/react';

import { HeaderProps } from '../../types/header';

export default function SearchHeader({ title }: HeaderProps) {
  return (
    <Flex
      bgColor="white"
      color="black"
      fontSize="md"
      fontWeight="medium"
      borderBottom="gray.200"
      pos="sticky"
      w="100%"
      h="44px"
      justify="center"
      align="center"
      top={0}
      as="header"
    >
      {title}
    </Flex>
  );
}
