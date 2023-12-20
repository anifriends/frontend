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
import AnimalfriendsLogo from 'shared/assets/image-anifriends-logo.png';
import IoEyeOff from 'shared/assets/IoEyeOff';
import IoEyeSharp from 'shared/assets/IoEyeSharp';
import APP_TYPE from 'shared/constants/appType';
import useToggle from 'shared/hooks/useToggle';
import useAuthStore from 'shared/store/authStore';
import { SigninRequestData } from 'shared/types/apis/auth';
import {
  removeItemFromStorage,
  setItemToStorage,
} from 'shared/utils/localStorage';
import { updateToast } from 'shared/utils/toast';
import { email, password } from 'shared/utils/validations';
import * as z from 'zod';

import { signinShelter } from '@/apis/auth';
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
    mutationFn: (data: SigninRequestData) => signinShelter(data),
    onSuccess: ({ data: { userId, accessToken } }) => {
      const user = { userId, accessToken };

      setUser(user);
      setItemToStorage(APP_TYPE.SHELTER_APP, JSON.stringify(user));
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
      removeItemFromStorage(APP_TYPE.SHELTER_APP);
      setFocus('email');
    },
  });

  const onSubmit = (data: Schema) => {
    mutate(data);
  };

  useEffect(() => setFocus('email'), [setFocus]);

  return (
    <Box px={4} pb="104px">
      <Center w="100%" py={10}>
        <Image boxSize={160} borderRadius={100} src={AnimalfriendsLogo} />
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2} isInvalid={errors.email ? true : false} isRequired>
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
        </VStack>
      </form>
    </Box>
  );
}
