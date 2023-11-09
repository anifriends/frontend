import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import IoEyeOff from 'shared/assets/icon-IoEyeOff.svg';
import IoEyeSharp from 'shared/assets/icon-IoEyeSharp.svg';
import AnimalfriendsLogo from 'shared/assets/image-anifriends-logo.png';

export default function SigninPage() {
  const [isShow, setIsShow] = useBoolean(true);

  const changeInputType = () => {
    setIsShow.toggle();
  };

  return (
    <Box px={4} pb="104px">
      <Center w="100%" py={10}>
        <Image boxSize={160} borderRadius={100} src={AnimalfriendsLogo} />
      </Center>
      <form>
        <FormControl mb={2} isRequired>
          <FormLabel>이메일</FormLabel>
          <Input placeholder="이메일을 입력하세요" type="email" />
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>비밀번호</FormLabel>
          <InputGroup>
            <Input
              placeholder="비밀번호를 입력하세요"
              type={isShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={changeInputType}>
              <Image src={isShow ? IoEyeSharp : IoEyeOff} />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <VStack
          maxW="container.sm"
          mx="auto"
          px={4}
          bgColor="white"
          pos="fixed"
          bottom={0}
          left={0}
          right={0}
          py={2}
          zIndex={10}
          spacing={2}
          align="stretch"
        >
          <Button
            fontWeight="semibold"
            bgColor="orange.400"
            color="white"
            type="submit"
            _hover={{
              bg: undefined,
            }}
            _active={{
              bg: undefined,
            }}
          >
            로그인
          </Button>
          <Button
            fontWeight="semibold"
            color="orange.400"
            bgColor="inherit"
            border="1px solid"
            borderColor="orange.400"
            _hover={{
              bg: undefined,
            }}
            _active={{
              bg: undefined,
            }}
          >
            회원가입
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
