import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import EditPhotoList from 'shared/components/EditPhotoList';
import ProfileInfo from 'shared/components/ProfileInfo';
import { useUploadPhoto } from 'shared/hooks/useUploadPhoto';
import { z } from 'zod';

const DUMMY_SHELTER_INFO = {
  shelterName: '양천구 보호소',
  email: 'shelter@gmail.com',
  address: '서울특별시 양천구',
};

const reviewSchema = z.object({
  content: z
    .string()
    .optional()
    .refine((val) => val?.length && val.length < 500, '에러입니다'),
});

type ReviewSchema = z.infer<typeof reviewSchema>;

const UPLOAD_LIMIT = 5;

export default function SheltersReviewsWritePage() {
  const { shelterId, applicantId } = useParams();

  console.log(shelterId);
  const { shelterName, email, address } = DUMMY_SHELTER_INFO;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const { photos, handleUploadPhoto, handleDeletePhoto } =
    useUploadPhoto(UPLOAD_LIMIT);

  const contentLength = watch('content')?.length ?? 0;

  const onSubmit: SubmitHandler<ReviewSchema> = (data: ReviewSchema) => {
    // TODO: review 작성 API 호출
    console.log(data, applicantId);
  };

  return (
    <Box h="100%" pos="relative">
      <ProfileInfo infoTitle={shelterName} infoTexts={[email, address]} />
      <Divider />
      <VStack py={6} px={4} align="stretch">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.content}>
            <Textarea
              {...register('content')}
              placeholder="모집글 상세 내용을 입력해 주세요"
              h="260px"
              mb={2}
            />
            <Flex justifyContent="end">
              {errors.content ? (
                <FormErrorMessage m={0}>
                  글자수 {contentLength} / 500
                </FormErrorMessage>
              ) : (
                <FormHelperText m={0}>
                  글자수 {contentLength} / 500
                </FormHelperText>
              )}
            </Flex>
          </FormControl>
        </form>
        <EditPhotoList
          photos={photos}
          uploadLimit={UPLOAD_LIMIT}
          onUploadPhoto={handleUploadPhoto}
          onDeletePhoto={handleDeletePhoto}
        />
      </VStack>
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
          작성 완료
        </Button>
      </VStack>
    </Box>
  );
}
