import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePhotoUpload } from 'shared/hooks/usePhotoUpload';
import { createFormattedTime } from 'shared/utils/date';
import { z } from 'zod';

import {
  MyInfoResponse,
  UpdateUserInfoParams,
  updateVolunteerUserInfo,
} from '@/apis/volunteer';
import useFetchMyVolunteer from '@/pages/my/_hooks/useFetchMyVolunteer';

const phoneRegx1 = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
const phoneRegx2 = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-(\d{3,4})-(\d{4})$/;

const accountSchema = z.object({
  name: z.string().trim().min(1, { message: '이름은 필수입니다' }),
  birthDate: z
    .string()
    .min(1, '생년월일 정보는 필수입니다')
    .refine(
      (val) => new Date(val) < new Date(),
      `${createFormattedTime(new Date())} 이전으로 선택해주세요`,
    ),
  phoneNumber: z
    .string()
    .refine((phone) => phoneRegx1.test(phone) || phoneRegx2.test(phone), {
      message: '전화번호 형식이 올바르지 않습니다',
    }),
  gender: z.enum(['MALE', 'FEMALE']),
});

type AccountSchema = z.infer<typeof accountSchema>;

export default function SettingsAccountPage() {
  const queryClient = useQueryClient();

  const toast = useToast();
  const { data: accountData } = useFetchMyVolunteer();

  const { mutate: updateAccount } = useMutation({
    mutationFn: (newData: UpdateUserInfoParams) =>
      updateVolunteerUserInfo(newData),
    onSuccess: (_, newData) => {
      queryClient.setQueryData(['myVolunteer'], (data: MyInfoResponse) => ({
        ...data,
        volunteerName: newData.name,
        volunteerBirthDate: newData.birthDate,
        volunteerPhoneNumber: newData.phoneNumber,
        volunteerImageUrl: newData.imageUrl,
        volunteerGender: newData.gender,
      }));
      toast({
        position: 'top',
        description: '계정 정보가 수정되었습니다.',
        status: 'success',
        duration: 1500,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  const { photo, setPhoto, handleUploadPhoto } = usePhotoUpload(
    accountData.volunteerImageUrl,
  );

  const uploadImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    handleUploadPhoto(files);
    event.target.value = '';
  };

  const setAccountForm = useCallback((account: MyInfoResponse) => {
    setValue('name', account.volunteerName);
    setValue('birthDate', account.volunteerBirthDate);
    setValue('phoneNumber', account.volunteerPhoneNumber);
    setValue('gender', account.volunteerGender);
  }, []);

  useEffect(() => {
    setAccountForm(accountData);
    setPhoto(accountData.volunteerImageUrl);
  }, [accountData, setAccountForm, setPhoto]);

  const onSubmit = handleSubmit((newData) => {
    updateAccount({ ...newData, ...{ imageUrl: photo } });
  });

  return (
    <Box px={4} pb={164}>
      <form onSubmit={onSubmit}>
        <Center py={30}>
          <Avatar
            boxSize={100}
            as="label"
            htmlFor="profileImg"
            cursor="pointer"
            src={photo}
            variant="프로필 이미지"
          />
          <Input
            id="profileImg"
            type="file"
            accept="image/*"
            display="none"
            onChange={uploadImgFile}
          />
        </Center>
        <FormControl mb={5}>
          <FormLabel fontWeight={400}>이메일</FormLabel>
          <Input
            disabled
            bgColor="gray.100"
            color="gray.500"
            _hover={{ border: `none` }}
            value={accountData.volunteerEmail}
          />
        </FormControl>
        <FormControl mb={5} isRequired isInvalid={Boolean(errors.name)}>
          <FormLabel fontWeight={400}>이름</FormLabel>
          <Input placeholder="이름을 입력하세요" {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={5} isRequired isInvalid={Boolean(errors.birthDate)}>
          <FormLabel fontWeight={400}>생년월일</FormLabel>
          <Input type="date" pr="10px" {...register('birthDate')} />
          <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={5} isRequired isInvalid={Boolean(errors.phoneNumber)}>
          <FormLabel fontWeight={400}>전화번호</FormLabel>
          <Input
            placeholder="전화번호를 입력하세요"
            {...register('phoneNumber')}
          />
          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={5} isRequired isInvalid={Boolean(errors.gender)}>
          <FormLabel fontWeight={400}>성별</FormLabel>
          <RadioGroup value={watch('gender')}>
            <HStack spacing={10}>
              <Radio colorScheme="orange" value="MALE" {...register('gender')}>
                남성
              </Radio>
              <Radio
                colorScheme="orange"
                value="FEMALE"
                {...register('gender')}
              >
                여성
              </Radio>
            </HStack>
          </RadioGroup>
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
            h="44px"
            bgColor="orange.400"
            color="white"
            _active={{ bg: undefined }}
            _hover={{ bg: undefined }}
          >
            수정 완료
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
