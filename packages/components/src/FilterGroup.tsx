import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FilterGroupProps = {
  children: ReactNode;
};

export function FilterGroup({ children }: FilterGroupProps) {
  return (
    <Flex
      pos="sticky"
      borderBottom="1px solid"
      borderColor="gray.200"
      zIndex={10}
      top={0}
      bgColor="white"
    >
      <Flex
        overflowX="scroll"
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
        flexDir="row"
        px={4}
        py={2}
        gap={1.5}
      >
        {children}
      </Flex>
    </Flex>
  );
}
