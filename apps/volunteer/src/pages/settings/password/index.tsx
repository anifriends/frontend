import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import IoEyeOff from 'shared/assets/IoEyeOff';
import IoEyeSharp from 'shared/assets/IoEyeSharp';
import LogoImageBox from 'shared/components/LogoImageBox';
import useToggle from 'shared/hooks/useToggle';
import { ChangePasswordRequestData } from 'shared/types/apis/auth';
import * as z from 'zod';

import { changeVolunteerPassword } from '@/apis/auth';

type Schema = z.infer<typeof schema>;

const schema = z
  .object({
    oldPassword: z.string().min(1, '기본 비밀번호 정보는 필수입니다'),
    newPassword: z.string().min(1, '변경 비밀번호 정보는 필수입니다'),
    // TODO
    //
    // .regex(
    //   /^(?=.*[!@#$%^&*()\-_=+[\]\\|{};:'",<.>/?]+)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    //   '비밀번호는 필수 정보입니다(8자 이상)',
    // ),
    newPasswordConfirm: z
      .string()
      .min(1, '변경 비밀번호 확인 정보는 필수입니다'),
  })
  .refine(
    ({ newPassword, newPasswordConfirm }) => newPassword === newPasswordConfirm,
    {
      message: '변경 비밀번호가 일치하지 않습니다',
      path: ['newPasswordConfirm'],
    },
  );

export default function SettingsPasswordPage() {
  const toast = useToast();
  const [isOldPasswordShow, toggleOldPasswordShow] = useToggle();
  const [isNewPasswordShow, toggleNewPasswordShow] = useToggle();
  const [isNewPasswordConfirmShow, toggleNewPasswordConfirmShow] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useMutation({
    mutationFn: (data: ChangePasswordRequestData) =>
      changeVolunteerPassword(data),
    onSuccess: () => {
      toast({
        position: 'top',
        description: '비밀번호 변경이 완료되었습니다',
        status: 'success',
        duration: 2500,
      });
    },
  });

  const onSubmit = ({ oldPassword, newPassword }: Schema) => {
    mutate({ oldPassword, newPassword });
  };

  return (
    <Box px={4} pb="56px">
      <LogoImageBox />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          mb={5}
          isRequired
          isInvalid={errors.oldPassword ? true : false}
        >
          <FormLabel>기존 비밀번호</FormLabel>
          <InputGroup>
            <Input
              {...register('oldPassword')}
              placeholder="기존 비밀번호를 입력하세요"
              type={isOldPasswordShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={toggleOldPasswordShow}>
              <Icon as={isOldPasswordShow ? IoEyeOff : IoEyeSharp} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.oldPassword && errors.oldPassword.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mb={5}
          isRequired
          isInvalid={errors.newPassword ? true : false}
        >
          <FormLabel>변경 비밀번호</FormLabel>
          <InputGroup>
            <Input
              {...register('newPassword')}
              placeholder="변경 비밀번호를 입력하세요"
              type={isNewPasswordShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={toggleNewPasswordShow}>
              <Icon as={isNewPasswordShow ? IoEyeOff : IoEyeSharp} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.newPassword && errors.newPassword.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mb={10}
          isRequired
          isInvalid={errors.newPasswordConfirm ? true : false}
        >
          <FormLabel>변경 비밀번호 확인</FormLabel>
          <InputGroup>
            <Input
              {...register('newPasswordConfirm')}
              placeholder="변경 비밀번호를 다시 입력하세요"
              type={isNewPasswordConfirmShow ? 'text' : 'password'}
            />
            <InputRightElement onClick={toggleNewPasswordConfirmShow}>
              <Icon as={isNewPasswordConfirmShow ? IoEyeOff : IoEyeSharp} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.newPasswordConfirm && errors.newPasswordConfirm.message}
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
            type="submit"
            bgColor="orange.400"
            color="white"
            _hover={{ bg: undefined }}
            _active={{ bg: undefined }}
          >
            비밀번호 변경하기
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
