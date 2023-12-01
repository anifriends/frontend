import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import EditPhotoList from 'shared/components/EditPhotoList';
import { useUploadPhoto } from 'shared/hooks/useUploadPhoto';
import * as z from 'zod';

import { updateShelterRecruitment } from '@/apis/recruitment';
import type { RecruitmentUpdateRequest } from '@/types/apis/recruitment';

import useGetVolunteerDetail, {
  RecruitmentDetail,
} from '../detail/_hooks/useGetVolunteerDetail';

const recruitmentSchema = z
  .object({
    title: z.string().min(1, '제목은 필수로 입력해주세요'),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    deadline: z.coerce.date(),
    capacity: z.coerce.number(),
    content: z
      .string()
      .optional()
      .refine((val) => val?.length && val.length < 500, '에러입니다'),
  })
  .refine(({ startTime, endTime }) => startTime.getTime() < endTime.getTime(), {
    message: '봉사 시작 일시 이후로 입력해주세요 ',
    path: ['endTime'],
  })
  .refine(
    ({ startTime, deadline }) => deadline.getTime() <= startTime.getTime(),
    {
      message: '봉사 시작 일시 전으로 입력해주세요',
      path: ['deadLine'],
    },
  );

type RecruitmentSchema = z.infer<typeof recruitmentSchema>;

const UPLOAD_LIMIT = 5;

export default function VolunteersUpdatePage() {
  const { id: recruitmentId } = useParams<{ id: string }>() as { id: string };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // TODO 이 훅에서 startDate, endDate와 같은 날짜데이터를 가공하기 때문에
  // 다른 훅을 만들어서 사용해야 할 것 같습니다.
  // 혹은 훅 내의 select 옵션을 수정해야 할 것 같습니다.
  const { data: recruitment, isPending: isRecruitFetchLoading } =
    useGetVolunteerDetail(Number(recruitmentId));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<RecruitmentSchema>({
    resolver: zodResolver(recruitmentSchema),
  });
  const { photos, setImageUrls, handleUploadPhoto, handleDeletePhoto } =
    useUploadPhoto(UPLOAD_LIMIT);

  const contentLength = watch('content')?.length ?? 0;

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      recruitmentId,
      request,
    }: {
      recruitmentId: number;
      request: RecruitmentUpdateRequest;
    }) => updateShelterRecruitment(recruitmentId, request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['recruitment', recruitmentId],
      });
      navigate(`/volunteers/${recruitmentId}`);
    },
    onError: (error) => {
      console.warn(error);
    },
  });

  const onSubmit: SubmitHandler<RecruitmentSchema> = (
    data: RecruitmentSchema,
  ) => {
    // alert(JSON.stringify(data));
    const { startTime, endTime, deadline } = data;

    mutate({
      recruitmentId: Number(recruitmentId),
      request: {
        ...data,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        deadline: deadline.toISOString(),
        imageUrls: photos
          .filter(({ url }) => url !== 'upload-failed')
          .map(({ url }) => url),
      },
    });
  };

  const setVolunteersRecruitmentFormvalues = useCallback(
    (recruitment: RecruitmentDetail) => {
      setValue('title', recruitment.title);
      setValue('startTime', new Date(recruitment.startTime));
      setValue('endTime', new Date(recruitment.endTime));
      setValue('deadline', new Date(recruitment.deadline));
      setValue('capacity', recruitment.capacity);
      setValue('content', recruitment?.content ?? '');
      setImageUrls(recruitment.imageUrls);
    },
    [],
  );

  useEffect(() => {
    setFocus('title');
    setVolunteersRecruitmentFormvalues(recruitment);
  }, [recruitment, setVolunteersRecruitmentFormvalues, setFocus]);

  if (isRecruitFetchLoading) {
    return <p>...로딩중</p>;
  }

  return (
    <Box pt={6} px={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={5} isRequired isInvalid={Boolean(errors.title)}>
          <FormLabel>제목</FormLabel>
          <Input
            {...register('title')}
            placeholder="모집글 제목을 입력해 주세요"
          />
        </FormControl>
        <FormControl mb={5} isRequired isInvalid={Boolean(errors.startTime)}>
          <FormLabel>봉사시작 일시</FormLabel>
          <Input
            {...register('startTime')}
            placeholder="봉사 시작 일시를 입력해 주세요"
            type="datetime-local"
          />
          <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isRequired isInvalid={Boolean(errors.endTime)}>
          <FormLabel>봉사종료 일시</FormLabel>
          <Input
            {...register('endTime')}
            placeholder="봉사 종료 일시를 입력해 주세요"
            type="datetime-local"
          />
          <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isRequired isInvalid={Boolean(errors.deadline)}>
          <FormLabel>모집 마감 일시</FormLabel>
          <Input
            {...register('deadline')}
            placeholder="모집 마감 일시를 입력해 주세요"
            type="datetime-local"
          />
          <FormErrorMessage>{errors.deadline?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isRequired isInvalid={!!errors.capacity}>
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
        <FormControl mb={5} isInvalid={!!errors.content}>
          <FormLabel>모집글 상세</FormLabel>
          <Textarea
            {...register('content')}
            placeholder="모집글 상세 내용을 입력해 주세요"
            mb={2}
          />
          <Flex justifyContent="end">
            {errors.content ? (
              <FormErrorMessage>글자수 {contentLength} / 500</FormErrorMessage>
            ) : (
              <FormHelperText>글자수 {contentLength} / 500</FormHelperText>
            )}
          </Flex>
        </FormControl>
        <EditPhotoList
          photos={photos}
          uploadLimit={UPLOAD_LIMIT}
          onUploadPhoto={handleUploadPhoto}
          onDeletePhoto={handleDeletePhoto}
        />
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
          _active={{
            bg: undefined,
          }}
          isLoading={isPending}
          type="submit"
        >
          등록
        </Button>
      </form>
    </Box>
  );
}
