import BackIcon from '@anifriends/assets/icon_back.svg';
import { useSearchHeaderStore } from '@anifriends/store';
import { Box, Flex, FormControl, Image, Input } from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchHeader() {
  const navigate = useNavigate();
  const [keyword, setKeyword, onSearch] = useSearchHeaderStore((state) => [
    state.keyword,
    state.setKeyword,
    state.onSearch,
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const goBack = () => navigate(-1);

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!keyword) {
      return;
    }

    onSearch(keyword);

    if (inputRef.current) {
      inputRef.current.blur();
    }
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
      zIndex={10}
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
          ref={inputRef}
          value={keyword}
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
