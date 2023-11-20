import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function SettingsAccountPage() {
  const [imgFile, setImgFile] = useState<string>('');

  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImgFile = URL.createObjectURL(file);
      setImgFile(newImgFile);
    }
  };
  return (
    <Box px={4} pb={208}>
      <form>
        <Center py={30}>
          <Avatar
            boxSize={100}
            as="label"
            htmlFor="profileImg"
            cursor="pointer"
            src={imgFile}
            variant="프로필 이미지"
          />
          <Input
            id="profileImg"
            type="file"
            accept="image/*"
            onChange={uploadImgFile}
            display="none"
          />
        </Center>
        <FormControl mb={5}>
          <FormLabel fontWeight={400}>이메일</FormLabel>
          <Input
            disabled
            bgColor="gray.100"
            color="gray.500"
            _hover={{ border: `none` }}
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>이름</FormLabel>
          <Input placeholder="이름을 입력하세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>생년월일</FormLabel>
          <Input type="date" pr="10px" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>전화번호</FormLabel>
          <Input type="tel" placeholder="전화번호를 입력하세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>성별</FormLabel>
          <RadioGroup>
            <HStack spacing={10}>
              <Radio colorScheme="orange" value="Male">
                남성
              </Radio>
              <Radio colorScheme="orange" value="Female">
                여성
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <Center>
          <Button
            type="submit"
            w="100%"
            h="44px"
            bgColor="orange.400"
            color="white"
            pos="absolute"
            bottom={21}
          >
            수정 완료
          </Button>
        </Center>
      </form>
    </Box>
  );
}
