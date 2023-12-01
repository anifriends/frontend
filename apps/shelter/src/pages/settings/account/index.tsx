import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePhotoUpload } from 'shared/hooks/usePhotoUpload';

import { updateShelterInfo } from '@/apis/shelter';
import { UpdateShelterInfo } from '@/types/apis/shetler';

import useFetchShelterAccount from './_hooks/useFetchShelterAccount';

export default function SettingsAccountPage() {
  const toast = useToast();
  const { data } = useFetchShelterAccount();
  const { mutate: updateShelter } = useMutation({
    mutationFn: (data: UpdateShelterInfo) => updateShelterInfo(data),
    onSuccess: () => {
      toast({
        position: 'top',
        description: '계정 정보가 수정되었습니다.',
        status: 'success',
        duration: 1500,
      });
    },
  });

  const { register, handleSubmit, reset, watch } = useForm<UpdateShelterInfo>();
  const { photo, setPhoto, handleUploadPhoto } = usePhotoUpload(data.imageUrl);

  useEffect(() => {
    reset(data);
    setPhoto(data.imageUrl);
  }, [data]);

  const onSubmit = handleSubmit((newData) => {
    updateShelter(newData);
  });

  const uploadImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    handleUploadPhoto(files);
    event.target.value = '';
  };

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
            {...register('imageUrl', { onChange: uploadImgFile })}
          />
        </Center>

        <FormControl mb={5}>
          <FormLabel fontWeight={400}>이메일</FormLabel>
          <Input
            disabled
            bgColor="gray.100"
            color="gray.500"
            _hover={{ border: 'none' }}
            value={data.email}
          />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>보호소 이름</FormLabel>
          <Input placeholder="이름을 입력하세요" {...register('name')} />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>보호소 주소</FormLabel>
          <Input
            placeholder="보호소 주소를 입력해주세요"
            {...register('address')}
          />
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
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>보호소 전화번호</FormLabel>
          <Input
            type="tel"
            placeholder="전화번호를 입력하세요"
            {...register('phoneNumber')}
          />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel fontWeight={400}>보호소 임시 전화번호</FormLabel>
          <Input
            type="tel"
            placeholder="전화번호를 입력하세요"
            {...register('sparePhoneNumber')}
          />
        </FormControl>
        <Center>
          <Button
            type="submit"
            w="100%"
            h="44px"
            pos="absolute"
            bottom={21}
            bgColor="orange.400"
            color="white"
            _active={{ bg: undefined }}
            _hover={{ bg: undefined }}
          >
            수정완료
          </Button>
        </Center>
      </form>
    </Box>
  );
}
