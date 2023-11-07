import { Box, Flex, Image, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '../../../assets/icon_back.svg';

export default function SearchHeader() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Flex
      bg="white"
      color="black"
      fontSize="md"
      fontWeight="medium"
      borderBottom="1px solid"
      borderColor="gray.200"
      pos="sticky"
      w="100%"
      h="44px"
      p="5px 16px"
      gap={3}
      justify="center"
      align="center"
      top={0}
      as="header"
    >
      <Box onClick={goBack} as="button">
        <Image src={BackIcon} alt="Back Icon" />
      </Box>
      <Input
        h="34px"
        bg="gray.100"
        rounded="full"
        border="none"
        variant="filled"
        outline="none"
        placeholder="검색어 입력"
        fontSize="md"
        _focus={{
          backgroundColor: 'gray.100',
        }}
      />
    </Flex>
  );
}
