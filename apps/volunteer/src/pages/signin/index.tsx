import AnimalfriendsLogo from '@anifriends/assets/image-anifriends-logo.png';
import { APP_TYPE } from '@anifriends/constants';
import { useToggle } from '@anifriends/hooks';
import { IoEyeOff, IoEyeSharp } from '@anifriends/icons';
import { useAuthStore } from '@anifriends/store';
import { SigninRequestData } from '@anifriends/types';
import {
  email,
  password,
  removeItemFromStorage,
  setItemToStorage,
  updateToast,
} from '@anifriends/utils';
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
import { useMutation } from '@tanstack/react-query';
import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { signinVolunteer } from '@/apis/auth';
import PATH from '@/constants/path';

type Schema = z.infer<typeof schema>;

const schema = z.object({
  email,
  password,
});

export default function SigninPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const signinToastId = useId();
  const [isShow, toggleInputShow] = useToggle();
  const { setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useMutation({
    mutationFn: (data: SigninRequestData) => signinVolunteer(data),
    onSuccess: ({ data: { userId, accessToken } }) => {
      const user = { userId, accessToken };

      setUser(user);
      setItemToStorage(APP_TYPE.VOLUNTEER_APP, JSON.stringify(user));
      navigate(`/${PATH.VOLUNTEERS.INDEX}`);
    },
    onError: (error) => {
      updateToast({
        toast,
        toastId: signinToastId,
        toastOptions: {
          position: 'top',
          description:
            error.response?.data.message ?? '알 수 없는 에러가 발생했습니다',
          status: 'error',
          duration: 1500,
          isClosable: true,
        },
      });
      setUser(null);
      removeItemFromStorage(APP_TYPE.VOLUNTEER_APP);
      setFocus('email');
    },
  });

  const onSubmit = (data: Schema) => {
    mutate(data);
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
            _hover={{ bg: undefined }}
            _active={{ bg: undefined }}
          >
            로그인
          </Button>
          <Button
            fontWeight="semibold"
            color="orange.400"
            bgColor="inherit"
            border="1px solid"
            borderColor="orange.400"
            _hover={{ bg: undefined }}
            _active={{ bg: undefined }}
            onClick={() => navigate(`/${PATH.SIGNUP}`)}
          >
            회원가입
          </Button>
          <Button
            fontWeight="semibold"
            bgColor="gray.100"
            color="gray.500"
            _hover={{ bg: undefined }}
            _active={{ bg: undefined }}
            onClick={() => navigate(`/${PATH.VOLUNTEERS.INDEX}`)}
          >
            비회원으로 사용하기
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
