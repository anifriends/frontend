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
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import EditPhotoList from 'shared/components/EditPhotoList';
import ProfileInfo from 'shared/components/ProfileInfo';
import { useUploadPhoto } from 'shared/hooks/useUploadPhoto';

import { getVolunteerReviewDetail, updateVolunteerReview } from '@/apis/review';
import { getSimpleShelterProfile } from '@/apis/shelter';
import PATH from '@/constants/path';
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
import { ReviewUpdateRequest } from '@/types/apis/review';

export default function SheltersReviewsUpdatePage() {
  const { shelterId, reviewId } = useParams();
  const navigate = useNavigate();

  if (!shelterId || !reviewId) {
    // TODO: shelterId 또는 applicantId 가 없는 경우 예외처리
    navigate(-1);
  }

  const { data: shelterInfo } = useQuery({
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

  const { data: reviewDetail } = useQuery({
    queryKey: ['review', 'detail', Number(reviewId)],
    queryFn: async () => {
      return (await getVolunteerReviewDetail(Number(reviewId))).data;
    },
    initialData: {
      reviewId: 0,
      reviewContent: '',
      reviewImageUrls: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      reviewId,
      request,
    }: {
      reviewId: number;
      request: ReviewUpdateRequest;
    }) => updateVolunteerReview(reviewId, request),
    onSuccess: () => {
      navigate(`/${PATH.MYPAGE.INDEX}`);
    },
  });

  const { shelterName, shelterImageUrl, shelterAddress, shelterEmail } =
    shelterInfo;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const { photos, setImageUrls, handleUploadPhoto, handleDeletePhoto } =
    useUploadPhoto(UPLOAD_LIMIT);

  const contentLength = watch('content')?.length ?? 0;

  const setReviewFormvalues = useCallback(
    (content: string, imageUrls: string[]) => {
      setValue('content', content);
      setImageUrls(imageUrls);
    },
    [],
  );

  useEffect(() => {
    const { reviewContent, reviewImageUrls } = reviewDetail;
    setReviewFormvalues(reviewContent, reviewImageUrls);
    setFocus('content');
  }, [reviewDetail, setReviewFormvalues, setFocus]);

  const onSubmit: SubmitHandler<ReviewSchema> = (data: ReviewSchema) => {
    const { content } = data;

    const request: ReviewUpdateRequest = {
      content,
      imageUrls: photos
        .filter(({ url }) => url !== 'upload-failed')
        .map(({ url }) => url),
    };

    mutate({ reviewId: Number(reviewId), request });
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
      <ReviewSubmitButton
        formId={FORM_ID}
        buttonText="작성완료"
        isLoading={isPending}
      />
    </Box>
  );
}
