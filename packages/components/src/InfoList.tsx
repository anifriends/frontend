import { Flex, FlexProps } from '@chakra-ui/react';

export function InfoList({ children, ...props }: FlexProps) {
  return (
    <Flex
      py={6}
      px={4}
      flexDir="column"
      gap="2px"
      borderBottom="1px solid"
      borderColor="gray.200"
      {...props}
    >
      {children}
    </Flex>
  );
}
