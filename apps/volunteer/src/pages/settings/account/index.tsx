import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  UpdateUserInfoParams,
  updateVolunteerUserInfo,
} from '@/apis/volunteer';
import useFetchMyVolunteer from '@/pages/my/_hooks/useFetchMyVolunteer';

export default function SettingsAccountPage() {
  const toast = useToast();
  const [imgFile, setImgFile] = useState<string>('');
  const { data } = useFetchMyVolunteer();
  const { mutate: updateAccount } = useMutation({
    mutationFn: (data: UpdateUserInfoParams) => updateVolunteerUserInfo(data),
    onSuccess: () => {
      toast({
        position: 'top',
        description: '계정 정보가 수정되었습니다.',
        status: 'success',
        duration: 1500,
      });
    },
  });
  const { register, handleSubmit, reset, watch } =
    useForm<UpdateUserInfoParams>();

  useEffect(() => {
    reset({
      name: data.volunteerName,
      imageUrl: data.volunteerImageUrl,
      birthDate: data.volunteerBirthDate,
      phoneNumber: data.volunteerPhoneNumber,
      gender: data.volunteerGender,
    });
    setImgFile(data.volunteerImageUrl);
  }, [data, reset]);

  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImgFile = URL.createObjectURL(file);
      setImgFile(newImgFile);
    }
  };

  const onSubmit = handleSubmit((newData) => {
    updateAccount(newData);
  });

  return (
    <Box px={4} pb={208}>
      <form onSubmit={onSubmit}>
        <Center py={30}>
          <Avatar
            boxSize={100}
            as="label"
            htmlFor="profileImg"
            cursor="pointer"
            src={imgFile}
            variant="프로필 이미지"
          />
          <Input
            id="profileImg"
            type="file"
            accept="image/*"
            display="none"
            {...register('imageUrl', { onChange: uploadImgFile })}
          />
        </Center>
        <FormControl mb={5}>
          <FormLabel fontWeight={400}>이메일</FormLabel>
          <Input
            disabled
            bgColor="gray.100"
            color="gray.500"
            _hover={{ border: `none` }}
            value={data.volunteerEmail}
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>이름</FormLabel>
          <Input placeholder="이름을 입력하세요" {...register('name')} />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>생년월일</FormLabel>
          <Input type="date" pr="10px" {...register('birthDate')} />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>전화번호</FormLabel>
          <Input
            type="tel"
            placeholder="전화번호를 입력하세요"
            {...register('phoneNumber')}
          />
        </FormControl>

        <FormControl mb={5} isRequired>
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

        <Center>
          <Button
            type="submit"
            w="100%"
            h="44px"
            bgColor="orange.400"
            color="white"
            pos="absolute"
            bottom={21}
            _active={{ bg: undefined }}
            _hover={{ bg: undefined }}
          >
            수정 완료
          </Button>
        </Center>
      </form>
    </Box>
  );
}
