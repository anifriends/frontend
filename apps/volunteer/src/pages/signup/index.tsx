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
  InputRightAddon,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import AnimalfriendsLogo from 'shared/assets/image-anifriends-logo.png';
import IoEyeOff from 'shared/assets/IoEyeOff';
import IoEyeSharp from 'shared/assets/IoEyeSharp';
import RadioGroup from 'shared/components/RadioGroup';
import useRadioGroup from 'shared/hooks/useRadioGroup';
import useToggle from 'shared/hooks/useToggle';

type GenderValue = 'FEMALE' | 'MALE';

type GenderText = '여성' | '남성';

export default function SignupPage() {
  const [isPasswordShow, togglePasswordShow] = useToggle();
  const [isPasswordConfirmShow, togglePasswordConfirmShow] = useToggle();
  const [genderValue, changeGenderValue] = useRadioGroup<GenderValue>('MALE');

  return (
    <Box px={4} pb="152px">
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
          <FormLabel>비밀번호</FormLabel>
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
          <FormLabel>이름</FormLabel>
          <Input placeholder="이름을 입력하세요" type="text" />
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>생년월일</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>전화번호</FormLabel>
          <Input placeholder="보호소 전화번호를 입력하세요" type="tel" />
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>성별</FormLabel>
          <RadioGroup<GenderValue, GenderText>
            value={genderValue}
            changeValue={changeGenderValue}
            radioAttributes={[
              { value: 'MALE', text: '남성' },
              { value: 'FEMALE', text: '여성' },
            ]}
          />
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
