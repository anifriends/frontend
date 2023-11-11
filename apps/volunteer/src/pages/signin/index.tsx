import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import AnimalfriendsLogo from 'shared/assets/image-anifriends-logo.png';
import IoEyeOff from 'shared/assets/IoEyeOff';
import IoEyeSharp from 'shared/assets/IoEyeSharp';
import useToggle from 'shared/hooks/useToggle';

export default function SigninPage() {
  const [isShow, toggleInputType] = useToggle();

  return (
    <Box px={4} pb="152px">
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
            <InputRightElement onClick={toggleInputType}>
              <Icon as={isShow ? IoEyeOff : IoEyeSharp} />
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
          <Button
            fontWeight="semibold"
            bgColor="gray.100"
            color="gray.500"
            _hover={{
              bg: undefined,
            }}
            _active={{
              bg: undefined,
            }}
          >
            비회원으로 사용하기
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
