import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import EditPhotoList from 'shared/components/EditPhotoList';
import * as z from 'zod';

const recruitmentSchema = z.object({
  title: z.string().min(1, '제목은 필수로 입력해주세요'),
  volunteerDate: z.coerce.string(),
  startTime: z.coerce.string(),
  endTime: z.coerce.string(),
  deadLine: z.coerce.string(),
  capacity: z.coerce.number(),
  content: z.coerce.string().optional(),
});

type RecruitmentSchema = z.infer<typeof recruitmentSchema>;

const DUMMY_IMAGE = 'https://source.unsplash.com/random';
const DUMMY_IMAGE_URLS = Array.from({ length: 2 }, () => DUMMY_IMAGE);

export default function VolunteersWritePage() {
  const { register, handleSubmit } = useForm<RecruitmentSchema>({
    resolver: zodResolver(recruitmentSchema),
  });
  const [imageUrls, setImageUrls] = useState<string[]>(DUMMY_IMAGE_URLS);

  const onSubmit: SubmitHandler<RecruitmentSchema> = (
    data: RecruitmentSchema,
  ) => {
    // alert(JSON.stringify(data));
    console.log('data', data);
  };

  return (
    <Box pt={6} px={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={5} isRequired>
          <FormLabel>제목</FormLabel>
          <Input
            {...register('title')}
            placeholder="모집글 제목을 입력해 주세요"
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel>봉사시작 시간</FormLabel>
          <Input
            {...register('volunteerDate')}
            placeholder="봉사일을 입력해 주세요"
            type="date"
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel>봉사시작 일시</FormLabel>
          <Input
            {...register('startTime')}
            placeholder="봉사 시작 시간을 입력해 주세요"
            type="time"
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel>봉사종료 일시</FormLabel>
          <Input
            {...register('endTime')}
            placeholder="봉사 종료 시간을 입력해 주세요"
            type="time"
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel>모집 마감 일시</FormLabel>
          <Input
            {...register('deadLine')}
            placeholder="모집 마감 일시를 입력해 주세요"
            type="datetime-local"
          />
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormLabel>모집 인원</FormLabel>
          <InputGroup>
            <Input
              {...register('capacity')}
              placeholder="모집 인원을 입력해 주세요"
              type="number"
            />
            <InputRightAddon>명</InputRightAddon>
          </InputGroup>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>모집글 상세</FormLabel>
          <Textarea
            {...register('content')}
            placeholder="모집글 상세 내용을 입력해 주세요"
            mb={2}
          />
          <Flex justifyContent="end">
            <FormHelperText>글자수 0 / 100</FormHelperText>
          </Flex>
        </FormControl>
        <EditPhotoList urls={imageUrls} setUrls={setImageUrls} />
        <Button
          mt={10}
          pos="sticky"
          bottom={2}
          width="100%"
          bgColor="orange.400"
          color="white"
          _hover={{
            bg: undefined,
          }}
          // _active={{
          //   bg: undefined,
          // }}
          type="submit"
        >
          등록
        </Button>
      </form>
    </Box>
  );
}
