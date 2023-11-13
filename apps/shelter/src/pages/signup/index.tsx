import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Switch,
  VStack,
} from '@chakra-ui/react';
import AnimalfriendsLogo from 'shared/assets/image-anifriends-logo.png';
import IoEyeOff from 'shared/assets/IoEyeOff';
import IoEyeSharp from 'shared/assets/IoEyeSharp';
import useToggle from 'shared/hooks/useToggle';

export default function SignupPage() {
  const [isPasswordShow, togglePasswordShow] = useToggle();
  const [isPasswordConfirmShow, togglePasswordConfirmShow] = useToggle();
  const [isShelterAddressOpen, toggleShelterAddressOpen] = useToggle();

  return (
    <Box px={4} pb="104px">
      <Center w="100%" py={10}>
        <Image boxSize={160} borderRadius={100} src={AnimalfriendsLogo} />
      </Center>
      <form>
        <FormControl mb={2} isRequired>
          <FormLabel>이메일</FormLabel>
          <InputGroup>
            <Input placeholder="이메일을 입력하세요" type="email" />
            <InputRightAddon as="button" bgColor="orange.400" color="white">
              확인
            </InputRightAddon>
          </InputGroup>
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>비밀번호</FormLabel>
          <InputGroup>
            <Input
              placeholder="비밀번호를 입력하세요"
              type={isPasswordShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={togglePasswordShow}>
              <Icon as={isPasswordShow ? IoEyeOff : IoEyeSharp} />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>비밀번호 확인</FormLabel>
          <InputGroup>
            <Input
              placeholder="비밀번호를 다시 입력하세요"
              type={isPasswordConfirmShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={togglePasswordConfirmShow}>
              <Icon as={isPasswordConfirmShow ? IoEyeOff : IoEyeSharp} />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>보호소 이름</FormLabel>
          <Input placeholder="보호소 이름을 입력하세요" type="text" />
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>보호소 주소</FormLabel>
          <Input placeholder="보호소 주소를 입력하세요" type="text" />
        </FormControl>
        <FormControl mb={2} isRequired>
          <HStack mb={2}>
            <FormLabel flexShrink={0} m={0}>
              보호소 상세주소
            </FormLabel>
            <FormControl as={HStack} spacing={1} justify="flex-end">
              <FormLabel
                pos="relative"
                top="1px"
                fontSize="14px"
                color="gray.500"
                m={0}
              >
                상세주소 공개
              </FormLabel>
              <Switch
                colorScheme="orange"
                isChecked={isShelterAddressOpen ? true : false}
                onChange={toggleShelterAddressOpen}
              />
            </FormControl>
          </HStack>
          <Input placeholder="보호소 상세주소를 입력하세요" type="text" />
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>보호소 전화번호</FormLabel>
          <Input placeholder="보호소 전화번호를 입력하세요" type="tel" />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>보호소 임시 전화번호</FormLabel>
          <Input placeholder="보호소 임시 전화번호를 입력하세요" type="tel" />
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
