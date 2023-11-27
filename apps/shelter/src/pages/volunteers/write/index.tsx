import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import EditPhotoList, { Photo } from 'shared/components/EditPhotoList';

export default function VolunteersWritePage() {
  const [imageUrls, setImageUrls] = useState<Photo[]>([]);

  return (
    <Box pt={6} px={4}>
      <form>
        <FormControl mb={5} isRequired>
          <FormLabel>제목</FormLabel>
          <Input placeholder="모집글 제목을 입력해 주세요" />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel>봉사일시</FormLabel>
          <Input
            placeholder="봉사 일시를 입력해 주세요"
            type="datetime-local"
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel>모집 마감 일시</FormLabel>
          <Input
            placeholder="모집 마감 일시를 입력해 주세요"
            type="datetime-local"
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel>모집 인원</FormLabel>
          <InputGroup>
            <Input placeholder="모집 인원을 입력해 주세요" />
            <InputRightAddon>명</InputRightAddon>
          </InputGroup>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>모집글 상세</FormLabel>
          <Textarea placeholder="모집글 상세 내용을 입력해 주세요" mb={2} />
          <Flex justifyContent="end">
            <FormHelperText>글자수 0 / 100</FormHelperText>
          </Flex>
        </FormControl>
        <EditPhotoList photos={imageUrls} setUrls={setImageUrls} />
        <Button
          mt={10}
          pos="sticky"
          bottom={2}
          width="100%"
          bgColor="orange.400"
          color="white"
          _hover={{
            bg: undefined,
          }}
          _active={{
            bg: undefined,
          }}
        >
          등록
        </Button>
      </form>
    </Box>
  );
}
