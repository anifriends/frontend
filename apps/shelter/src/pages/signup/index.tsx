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
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import AnimalfriendsLogo from 'shared/assets/image-anifriends-logo.png';
import IoEyeOff from 'shared/assets/IoEyeOff';
import IoEyeSharp from 'shared/assets/IoEyeSharp';
import useToggle from 'shared/hooks/useToggle';
import * as z from 'zod';

type Schema = z.infer<typeof schema>;

const schema = z
  .object({
    email: z
      .string()
      .min(1, '이메일은 필수 정보입니다')
      .email('유효하지 않은 이메일입니다'),
    password: z
      .string()
      .regex(
        /^(?=.*[!@#$%^&*()\-_=+[\]\\|{};:'",<.>/?]+)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        '비밀번호는 필수 정보입니다(8자 이상)',
      ),
    passwordConfirm: z.string().min(1, '비밀번호 확인 정보는 필수입니다'),
    name: z.string().min(1, '보호소 이름 정보는 필수입니다'),
    address: z.string().min(1, '보호소 주소 정보는 필수입니다'),
    addressDetail: z.string().min(1, '보호소 상세주소 정보는 필수입니다'),
    isOpendedAddress: z.boolean(),
    phoneNumber: z
      .string()
      .min(1, '보호소 전화번호 정보는 필수입니다')
      .refine(
        (val) => !Number.isNaN(Number(val)),
        '전화번호 형식은 숫자입니다',
      ),
    sparePhoneNumber: z
      .string()
      .refine(
        (val) => !Number.isNaN(Number(val)) || val === '',
        '전화번호 형식은 숫자입니다',
      ),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export default function SignupPage() {
  const [isPasswordShow, togglePasswordShow] = useToggle();
  const [isPasswordConfirmShow, togglePasswordConfirmShow] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Schema>({
    defaultValues: {
      isOpendedAddress: false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
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
              type="email"
            />
            <InputRightAddon as="button" bgColor="orange.400" color="white">
              확인
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
              isInvalid={errors.isOpendedAddress ? true : false}
            >
              <FormLabel
                pos="relative"
                top="1px"
                fontSize="14px"
                color="gray.500"
                m={0}
              >
                상세주소 공개
              </FormLabel>
              <Controller
                name="isOpendedAddress"
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
            {errors.isOpendedAddress && errors.isOpendedAddress.message}
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
          <FormHelperText>형식: 01012345678</FormHelperText>
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
