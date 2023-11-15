import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AnimalfriendsLogo from 'shared/assets/image-anifriends-logo.png';
import IoEyeOff from 'shared/assets/IoEyeOff';
import IoEyeSharp from 'shared/assets/IoEyeSharp';
import useToggle from 'shared/hooks/useToggle';
import * as z from 'zod';

import { signinVolunteer } from '@/apis/auth';
import PATH from '@/constants/path';

type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z
    .string()
    .min(1, '이메일이 입력되지 않았습니다')
    .email('유효하지 않은 이메일입니다'),
  password: z.string().min(1, '비밀번호가 입력되지 않았습니다'),
});

export default function SigninPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isShow, toggleInputShow] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const goSignupPage = () => {
    navigate(`/${PATH.SIGNUP}`);
  };

  const goVolunteersPage = () => {
    navigate(`/${PATH.VOLUNTEERS.INDEX}`);
  };

  const onSubmit = async (data: Schema) => {
    const result = await signinVolunteer(data);

    if ('data' in result) {
      goVolunteersPage();
    } else {
      if (result.response) {
        const {
          response: {
            data: { message },
          },
        } = result;

        toast({
          position: 'top',
          description: message,
          status: 'error',
          duration: 1500,
        });

        setFocus('email');
      }
    }
  };

  useEffect(() => setFocus('email'), [setFocus]);

  return (
    <Box px={4} pb="152px">
      <Center w="100%" py={10}>
        <Image boxSize={160} borderRadius={100} src={AnimalfriendsLogo} />
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2} isRequired isInvalid={errors.email ? true : false}>
          <FormLabel>이메일</FormLabel>
          <Input
            {...register('email')}
            placeholder="이메일을 입력하세요"
            type="email"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mb={2}
          isRequired
          isInvalid={errors.password ? true : false}
        >
          <FormLabel>비밀번호</FormLabel>
          <InputGroup>
            <Input
              {...register('password')}
              placeholder="비밀번호를 입력하세요"
              type={isShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={toggleInputShow}>
              <Icon as={isShow ? IoEyeOff : IoEyeSharp} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
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
            onClick={goSignupPage}
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
            onClick={goVolunteersPage}
          >
            비회원으로 사용하기
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
