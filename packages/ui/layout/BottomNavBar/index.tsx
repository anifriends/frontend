import { Flex } from '@chakra-ui/react';

export default function BottomNavBar() {
  return (
    <Flex
      w="100%"
      h="50px"
      justify="center"
      align="center"
      bottom={0}
      pos="fixed"
      zIndex={10}
    >
      BottomNavBar
    </Flex>
  );
}
