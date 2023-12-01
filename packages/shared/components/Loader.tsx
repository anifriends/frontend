import { Flex, Spinner } from '@chakra-ui/react';

export default function Loader() {
  return (
    <Flex justify="center" align="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.400"
        size="xl"
      />
    </Flex>
  );
}
