import {
  Box,
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

import ReviewSubmitButton from '@/pages/shelters/reviews/_components/ReviewSubmitButton';
import {
  FORM_ID,
  UPLOAD_LIMIT,
} from '@/pages/shelters/reviews/_constants/reviews';
import {
  ReviewSchema,
  reviewSchema,
} from '@/pages/shelters/reviews/_schema/reviewSchema';

const DUMMY_SHELTER_INFO = {
  shelterName: '양천구 보호소',
  email: 'shelter@gmail.com',
  address: '서울특별시 양천구',
};

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
        <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.content}>
            <Textarea
              {...register('content')}
              placeholder="모집글 상세 내용을 입력해 주세요"
              h={260}
            />
            <Flex justifyContent="end">
              {errors.content ? (
                <FormErrorMessage>
                  글자수 {contentLength} / 500
                </FormErrorMessage>
              ) : (
                <FormHelperText>글자수 {contentLength} / 500</FormHelperText>
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
      <ReviewSubmitButton formId={FORM_ID} buttonText="작성완료" />
    </Box>
  );
}
