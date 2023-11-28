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
import { useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import EditPhotoList from 'shared/components/EditPhotoList';
import ProfileInfo from 'shared/components/ProfileInfo';
import { useUploadPhoto } from 'shared/hooks/useUploadPhoto';

import { getSimpleShelterProfile } from '@/apis/shelter';
import ReviewSubmitButton from '@/pages/shelters/reviews/_components/ReviewSubmitButton';
import {
  FORM_ID,
  MAX_REVIEW_CONTENTS_LENGTH,
  UPLOAD_LIMIT,
} from '@/pages/shelters/reviews/_constants/reviews';
import {
  ReviewSchema,
  reviewSchema,
} from '@/pages/shelters/reviews/_schema/reviewSchema';

export default function SheltersReviewsUpdatePage() {
  const { shelterId, reviewId } = useParams();
  const navigate = useNavigate();

  if (!shelterId) {
    // TODO: shelterId 또는 applicantId 가 없는 경우 예외처리
    navigate(-1);
  }

  const { data } = useQuery({
    queryKey: ['shelterProfile', Number(shelterId)],
    queryFn: async () => {
      return (await getSimpleShelterProfile(Number(shelterId))).data;
    },
    initialData: {
      shelterName: '',
      shelterImageUrl: '',
      shelterAddress: '',
      shelterEmail: '',
    },
  });

  const { shelterName, shelterImageUrl, shelterAddress, shelterEmail } = data;

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
    console.log(data, reviewId);
  };

  return (
    <Box>
      <ProfileInfo
        infoImage={shelterImageUrl}
        infoTitle={shelterName}
        infoTexts={[shelterEmail, shelterAddress]}
      />
      <Divider />
      <VStack py={6} px={4} align="stretch">
        <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.content}>
            <Textarea
              {...register('content')}
              placeholder="봉사 후기를 작성해 주세요."
              h={280}
            />
            <Flex justifyContent="end">
              {errors.content ? (
                <FormErrorMessage>
                  {`글자수 ${contentLength} / ${MAX_REVIEW_CONTENTS_LENGTH}`}
                </FormErrorMessage>
              ) : (
                <FormHelperText>
                  {`글자수 ${contentLength} / ${MAX_REVIEW_CONTENTS_LENGTH}`}
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
      <ReviewSubmitButton formId={FORM_ID} buttonText="작성완료" />
    </Box>
  );
}
