import AnimalfriendsLogo from '@anifriends/assets/image-anifriends-logo.png';
import { useToggle } from '@anifriends/hooks';
import { IoEyeOff, IoEyeSharp } from '@anifriends/icons';
import { CheckDuplicatedEmailRequestData } from '@anifriends/types';
import {
  address,
  addressDetail,
  email,
  isEmailDuplicated,
  isOpenedAddress,
  name,
  password,
  passwordConfirm,
  phoneNumber,
  sparePhoneNumber,
  updateToast,
} from '@anifriends/utils';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Switch,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { checkDuplicatedShelterEmail, signupShelter } from '@/apis/auth';
import PATH from '@/constants/path';
import { SignupRequestData } from '@/types/apis/auth';

type Schema = z.infer<typeof schema>;

const schema = z
  .object({
    email,
    isEmailDuplicated,
    password,
    passwordConfirm,
    name,
    address,
    addressDetail,
    isOpenedAddress,
    phoneNumber,
    sparePhoneNumber,
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다',
  });

export default function SignupPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const signupToastId = useId();
  const [isPasswordShow, togglePasswordShow] = useToggle();
  const [isPasswordConfirmShow, togglePasswordConfirmShow] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
    setFocus,
  } = useForm<Schema>({
    defaultValues: {
      isOpenedAddress: false,
      isEmailDuplicated: true,
    },
    resolver: zodResolver(schema),
  });
  const { mutate: signupShelterMutate } = useMutation({
    mutationFn: (data: SignupRequestData) => signupShelter(data),
    onSuccess: () => {
      toast({
        position: 'top',
        description: '회원가입이 완료되었습니다',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
      navigate(`/${PATH.SIGNIN}`);
    },
    onError: (error) => {
      updateToast({
        toast,
        toastId: signupToastId,
        toastOptions: {
          id: signupToastId,
          position: 'top',
          description: error.response?.data.message,
          status: 'error',
          duration: 1500,
          isClosable: true,
        },
      });
    },
  });
  const { mutate: checkDuplicatedEmailMutate } = useMutation({
    mutationFn: (data: CheckDuplicatedEmailRequestData) =>
      checkDuplicatedShelterEmail(data),
    onSuccess: ({ data: { isDuplicated } }) => {
      if (isDuplicated) {
        setValue('isEmailDuplicated', true);
        updateToast({
          toast,
          toastId: signupToastId,
          toastOptions: {
            id: signupToastId,
            position: 'top',
            description: '이메일이 중복됩니다',
            status: 'error',
            duration: 1500,
            isClosable: true,
          },
        });
        setFocus('email');
      } else {
        setValue('isEmailDuplicated', false);
        updateToast({
          toast,
          toastId: signupToastId,
          toastOptions: {
            id: signupToastId,
            position: 'top',
            description: '이메일이 확인되었습니다',
            status: 'success',
            duration: 1500,
            isClosable: true,
          },
        });
      }
    },
    onError: (error) => {
      updateToast({
        toast,
        toastId: signupToastId,
        toastOptions: {
          id: signupToastId,
          position: 'top',
          description: error.response?.data.message,
          status: 'error',
          duration: 1500,
          isClosable: true,
        },
      });
      setFocus('email');
    },
  });

  const watchIsEmailDuplicated = watch('isEmailDuplicated');
  const watchEmail = watch('email');

  const checkDuplicatedEmail = () => {
    if (!watchIsEmailDuplicated) {
      setValue('email', '');
      setValue('isEmailDuplicated', true);

      return;
    }

    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      watchEmail,
    );

    if (!isValid) {
      updateToast({
        toast,
        toastId: signupToastId,
        toastOptions: {
          id: signupToastId,
          position: 'top',
          description: '이메일이 유효하지 않습니다',
          status: 'error',
          duration: 1500,
          isClosable: true,
        },
      });
      setValue('isEmailDuplicated', true);
      setFocus('email');

      return;
    }

    checkDuplicatedEmailMutate({ email: getValues('email') });
  };

  const onSubmit = async ({
    email,
    password,
    name,
    address,
    addressDetail,
    phoneNumber,
    sparePhoneNumber,
    isOpenedAddress,
    isEmailDuplicated,
  }: Schema) => {
    if (isEmailDuplicated) {
      updateToast({
        toast,
        toastId: signupToastId,
        toastOptions: {
          position: 'top',
          description: '이메일 중복 확인을 해주세요',
          status: 'error',
          duration: 1500,
          isClosable: true,
        },
      });

      return;
    }

    signupShelterMutate({
      email,
      password,
      name,
      address,
      addressDetail,
      phoneNumber,
      sparePhoneNumber,
      isOpenedAddress,
    });
  };

  return (
    <Box px={4} pb="104px">
      <Center w="100%" py={10}>
        <Image boxSize={160} borderRadius={100} src={AnimalfriendsLogo} />
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2} isRequired isInvalid={errors.email ? true : false}>
          <FormLabel>이메일</FormLabel>
          <InputGroup>
            <Input
              {...register('email')}
              placeholder="이메일을 입력하세요"
              type="text"
              disabled={watchIsEmailDuplicated ? false : true}
            />
            <InputRightAddon
              as="button"
              type="button"
              bgColor="orange.400"
              color="white"
              onClick={checkDuplicatedEmail}
            >
              {watchIsEmailDuplicated ? '확인' : '초기화'}
            </InputRightAddon>
          </InputGroup>
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
              type={isPasswordShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={togglePasswordShow}>
              <Icon as={isPasswordShow ? IoEyeOff : IoEyeSharp} />
            </InputRightElement>
          </InputGroup>
          <FormHelperText>
            영대문자, 영소문자, 숫자, 특수문자 조합 8자리 이상
            <br />
            특수문자: {`!@#$%^&*()-_=+[\\]{};:'",<.>/?`}
          </FormHelperText>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mb={2}
          isRequired
          isInvalid={errors.passwordConfirm ? true : false}
        >
          <FormLabel>비밀번호 확인</FormLabel>
          <InputGroup>
            <Input
              {...register('passwordConfirm')}
              placeholder="비밀번호를 다시 입력하세요"
              type={isPasswordConfirmShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={togglePasswordConfirmShow}>
              <Icon as={isPasswordConfirmShow ? IoEyeOff : IoEyeSharp} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={2} isRequired isInvalid={errors.name ? true : false}>
          <FormLabel>보호소 이름</FormLabel>
          <Input
            {...register('name')}
            placeholder="보호소 이름을 입력하세요"
            type="text"
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mb={2}
          isRequired
          isInvalid={errors.address ? true : false}
        >
          <FormLabel>보호소 주소</FormLabel>
          <Input
            {...register('address')}
            placeholder="보호소 주소를 입력하세요"
            type="text"
          />
          <FormErrorMessage>
            {errors.address && errors.address.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mb={2}
          isRequired
          isInvalid={errors.addressDetail ? true : false}
        >
          <HStack mb={2}>
            <FormLabel flexShrink={0} m={0}>
              보호소 상세주소
            </FormLabel>
            <FormControl
              as={HStack}
              spacing={1}
              justify="flex-end"
              isInvalid={errors.isOpenedAddress ? true : false}
            >
              <FormLabel fontSize="14px" color="gray.500" m={0}>
                상세주소 공개
              </FormLabel>
              <Controller
                name="isOpenedAddress"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Switch
                    colorScheme="orange"
                    isChecked={value ? true : false}
                    onChange={onChange}
                  />
                )}
              />
            </FormControl>
          </HStack>
          <Input
            {...register('addressDetail')}
            placeholder="보호소 상세주소를 입력하세요"
            type="text"
          />
          <FormErrorMessage>
            {errors.isOpenedAddress && errors.isOpenedAddress.message}
          </FormErrorMessage>
          <FormErrorMessage>
            {errors.addressDetail && errors.addressDetail.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mb={2}
          isRequired
          isInvalid={errors.phoneNumber ? true : false}
        >
          <FormLabel>보호소 전화번호</FormLabel>
          <Input
            {...register('phoneNumber')}
            placeholder="보호소 전화번호를 입력하세요"
            type="tel"
          />
          <FormHelperText>형식: 010-1234-5678</FormHelperText>
          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={2} isInvalid={errors.sparePhoneNumber ? true : false}>
          <FormLabel>보호소 임시 전화번호</FormLabel>
          <Input
            {...register('sparePhoneNumber')}
            placeholder="보호소 임시 전화번호를 입력하세요"
            type="tel"
          />
          <FormErrorMessage>
            {errors.sparePhoneNumber && errors.sparePhoneNumber.message}
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
            회원가입
          </Button>
          <Button
            fontWeight="semibold"
            color="orange.400"
            bgColor="inherit"
            border="1px solid"
            borderColor="orange.400"
            _hover={{ bg: undefined }}
            _active={{ bg: undefined }}
            onClick={() => navigate(`/${PATH.SIGNIN}`)}
          >
            로그인
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
