import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Switch,
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
    <Box px={4} pb={193}>
      <form>
        <Center py={30}>
          <FormLabel htmlFor="fileInput" cursor="pointer" fontWeight={400} />
          <Avatar
            boxSize={100}
            as="label"
            htmlFor="profileImg"
            cursor="pointer"
            src={imgFile}
          />
          <Input
            id="profileImg"
            type="file"
            accept="image/*"
            display="none"
            onChange={uploadImgFile}
          />
        </Center>

        <FormControl mb={5}>
          <FormLabel fontWeight={400}>이메일</FormLabel>
          <Input
            disabled
            bgColor="gray.100"
            color="gray.500"
            _hover={{ border: 'none' }}
          />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>보호소 이름</FormLabel>
          <Input placeholder="이름을 입력하세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>보호소 주소</FormLabel>
          <Input placeholder="보호소 주소를 입력해주세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <HStack mb={2}>
            <FormLabel m={0} fontWeight={400} w="100%">
              보호소 상세 주소
            </FormLabel>
            <FormControl as={HStack} justify="flex-end" spacing={1}>
              <FormLabel
                m={0}
                fontSize="sm"
                color="gray.500"
                pos="relative"
                top="1px"
              >
                상세주소 공개
              </FormLabel>
              <Switch colorScheme="orange" />
            </FormControl>
          </HStack>
          <Input placeholder="보호소 상세 주소를 입력해주세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>보호소 전화번호</FormLabel>
          <Input type="tel" placeholder="전화번호를 입력하세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>보호소 임시 전화번호</FormLabel>
          <Input type="tel" placeholder="전화번호를 입력하세요" />
        </FormControl>
        <Center>
          <Button
            type="submit"
            w="100%"
            h="44px"
            pos="absolute"
            bottom={21}
            bgColor="orange.400"
            color="white"
          >
            수정완료
          </Button>
        </Center>
      </form>
    </Box>
  );
}
