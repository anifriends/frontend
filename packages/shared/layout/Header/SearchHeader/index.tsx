import { Box, Flex, FormControl, Image, Input } from '@chakra-ui/react';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '../../../assets/icon_back.svg';
import useSearchHeaderStore from '../../../store/searchHeaderStore';

export default function SearchHeader() {
  const navigate = useNavigate();
  const [keyword, setKeyword, onSearch] = useSearchHeaderStore((state) => [
    state.keyword,
    state.setKeyword,
    state.onSearch,
  ]);

  const goBack = () => navigate(-1);

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    onSearch(keyword);
  };

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
      <FormControl onSubmit={handleSubmit} as="form">
        <Input
          onChange={handleChangeKeyword}
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
      </FormControl>
    </Flex>
  );
}
