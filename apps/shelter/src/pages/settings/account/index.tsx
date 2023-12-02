import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Switch,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Suspense, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePhotoUpload } from 'shared/hooks/usePhotoUpload';
import { z } from 'zod';

import { updateShelterInfo } from '@/apis/shelter';
import useFetchShelterProfile from '@/pages/my/_hooks/useFetchShelterProfile';
import { ShelterInfo, UpdateShelterInfo } from '@/types/apis/shetler';

const phoneRegx1 = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
const phoneRegx2 = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-(\d{3,4})-(\d{4})$/;

const accountSchema = z.object({
  name: z.string().trim().min(1, { message: '이름은 필수입니다' }),
  address: z.string().min(1, { message: '보호소 주소 정보는 필수입니다' }),
  addressDetail: z
    .string()
    .trim()
    .min(1, { message: '보호소 상세주소 정보는 필수입니다.' }),
  phoneNumber: z
    .string()
    .refine((phone) => phoneRegx1.test(phone) || phoneRegx2.test(phone), {
      message: '전화번호 형식이 올바르지 않습니다',
    }),
  sparePhoneNumber: z
    .string()
    .refine((phone) => phoneRegx1.test(phone) || phoneRegx2.test(phone), {
      message: '전화번호 형식이 올바르지 않습니다',
    }),
  isOpenedAddress: z.boolean(),
});

type AccountSchema = z.infer<typeof accountSchema>;

function SettingsAccount() {
  const queryClient = useQueryClient();

  const toast = useToast();

  const { data: accountData } = useFetchShelterProfile();

  const { mutate: updateShelter } = useMutation({
    mutationFn: (newData: UpdateShelterInfo) => updateShelterInfo(newData),
    onSuccess: (_, newData) => {
      queryClient.setQueryData(['shelterProfile'], (data: ShelterInfo) => ({
        ...data,
        ...newData,
      }));
      toast({
        position: 'top',
        description: '계정 정보가 수정되었습니다.',
        status: 'success',
        duration: 1500,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  const { photo, setPhoto, handleUploadPhoto } = usePhotoUpload(
    accountData.imageUrl,
  );

  const onSubmit = handleSubmit((newData) => {
    updateShelter({ ...newData, ...{ imageUrl: photo } });
  });

  const uploadImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    handleUploadPhoto(files);
    event.target.value = '';
  };

  const setAccountForm = useCallback((account: AccountSchema) => {
    setValue('name', account.name);
    setValue('address', account.address);
    setValue('addressDetail', account.addressDetail);
    setValue('phoneNumber', account.phoneNumber);
    setValue('sparePhoneNumber', account.sparePhoneNumber);
    setValue('isOpenedAddress', account.isOpenedAddress);
  }, []);

  useEffect(() => {
    setAccountForm(accountData);
    setPhoto(accountData.imageUrl);
  }, [accountData, setAccountForm, setPhoto]);

  return (
    <Box px={4} pb={193}>
      <form onSubmit={onSubmit}>
        <Center py={30}>
          <FormLabel htmlFor="fileInput" cursor="pointer" fontWeight={400} />
          <Avatar
            boxSize={100}
            as="label"
            htmlFor="profileImg"
            cursor="pointer"
            src={photo}
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
            _hover={{ border: 'none' }}
            value={accountData.email}
          />
        </FormControl>

        <FormControl mb={5} isRequired isInvalid={Boolean(errors.name)}>
          <FormLabel fontWeight={400}>보호소 이름</FormLabel>
          <Input placeholder="이름을 입력하세요" {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={5} isRequired isInvalid={Boolean(errors.address)}>
          <FormLabel fontWeight={400}>보호소 주소</FormLabel>
          <Input
            placeholder="보호소 주소를 입력해주세요"
            {...register('address')}
          />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={5} isRequired>
          <HStack mb={2}>
            <FormLabel m={0} fontWeight={400} w="100%">
              보호소 상세 주소
            </FormLabel>
            <FormControl as={HStack} justify="flex-end" spacing={1}>
              <FormLabel
                m={0}
                fontSize="sm"
                color="gray.500"
                pos="relative"
                top="1px"
              >
                상세주소 공개
              </FormLabel>
              <Switch
                colorScheme="orange"
                isChecked={watch('isOpenedAddress')}
                {...register('isOpenedAddress')}
              />
            </FormControl>
          </HStack>
          <Input
            placeholder="보호소 상세 주소를 입력해주세요"
            {...register('addressDetail')}
          />
          <FormErrorMessage>{errors.addressDetail?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={5} isRequired isInvalid={Boolean(errors.phoneNumber)}>
          <FormLabel fontWeight={400}>보호소 전화번호</FormLabel>
          <Input
            placeholder="전화번호를 입력하세요"
            {...register('phoneNumber')}
          />
          <FormHelperText> 예시) 010-1234-4567 또는 02-123-4567</FormHelperText>
          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={5}
          isRequired
          isInvalid={Boolean(errors.sparePhoneNumber)}
        >
          <FormLabel fontWeight={400}>보호소 임시 전화번호</FormLabel>
          <Input
            placeholder="전화번호를 입력하세요"
            {...register('sparePhoneNumber')}
          />
          <FormErrorMessage>
            {errors.sparePhoneNumber?.message}
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
            h="44px"
            bgColor="orange.400"
            color="white"
            _active={{ bg: undefined }}
            _hover={{ bg: undefined }}
          >
            수정완료
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default function SettingsAccountPage() {
  return (
    <Suspense fallback={<p>'로딩 중 입니다'</p>}>
      <SettingsAccount />
    </Suspense>
  );
}
