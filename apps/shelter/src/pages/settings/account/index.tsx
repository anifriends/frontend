import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Switch,
} from '@chakra-ui/react';
import { useState } from 'react';
import PhoneIcon from 'shared/assets/icon_phone.svg';

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
          <FormLabel mb={3.5} fontWeight={400}>
            이메일
          </FormLabel>
          <Input
            disabled
            bgColor="gray.100"
            color="gray.500"
            _hover={{ border: 'none' }}
          />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel mb={3.5} fontWeight={400}>
            보호소 이름
          </FormLabel>
          <Input placeholder="이름을 입력하세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel mb={3.5} fontWeight={400}>
            보호소 주소
          </FormLabel>
          <Input placeholder="보호소 주소를 입력해주세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <HStack>
            <FormLabel mb={3.5} fontWeight={400} w="100%">
              보호소 상세 주소
            </FormLabel>
            <FormControl as={HStack} justify="flex-end" mb={3.5}>
              <FormLabel mb={0} fontSize="sm" color="gray.500">
                상세주소 공개
              </FormLabel>
              <Switch colorScheme="orange" />
            </FormControl>
          </HStack>
          <Input placeholder="보호소 상세 주소를 입력해주세요" />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel mb={3.5} fontWeight={400}>
            보호소 전화번호
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              <Image src={PhoneIcon} />
            </InputRightElement>
            <Input type="tel" placeholder="전화번호를 입력하세요" />
          </InputGroup>
          <FormErrorMessage />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel mb={3.5} fontWeight={400}>
            보호소 임시 전화번호
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              <Image src={PhoneIcon} />
            </InputRightElement>
            <Input type="tel" placeholder="전화번호를 입력하세요" />
          </InputGroup>
          <FormErrorMessage />
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
