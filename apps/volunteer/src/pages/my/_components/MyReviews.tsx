import {
  Box,
  Heading,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from 'shared/components/AlertModal';
import InfoSubtext from 'shared/components/InfoSubtext';
import ReviewItem from 'shared/components/ReviewItem';
import useIntersect from 'shared/hooks/useIntersection';
import { createFormattedTime } from 'shared/utils/date';

import { deleteVolunteerReview } from '@/apis/review';
import { getMyReviewsAPI } from '@/apis/volunteer';

export default function MyReviews() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteReviewId, setDeleteReviewId] = useState(0);

  const toast = useToast();

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['myreviews'],
    queryFn: async ({ pageParam }) =>
      (await getMyReviewsAPI(pageParam, 10)).data,
    initialPageParam: 0,
    getNextPageParam: ({ pageInfo }, _, lastPageParam) =>
      pageInfo.hasNext ? lastPageParam + 1 : null,
  });

  const reviews = pages.flatMap((item) => item.reviews);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const { mutate: deleteReveiw } = useMutation({
    mutationFn: async (reviewId: number) =>
      await deleteVolunteerReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myreviews'] });
      setDeleteReviewId(0);
      onClose();
      toast({
        position: 'top',
        description: '삭제되었습니다',
        status: 'success',
        duration: 1500,
      });
    },
  });

  const openDeleteModal = (reviewId: number) => {
    onOpen();
    setDeleteReviewId(reviewId);
  };

  return (
    <Box minH={500}>
      <Heading fontWeight={600} fontSize="md" py={4}>
        작성한 후기 {pages[0].pageInfo.totalElements}개
      </Heading>
      <VStack spacing={2}>
        {reviews.map((review) => {
          const { reviewId, shelterId } = review;
          return (
            <ReviewItem
              key={reviewId}
              showMenuButton={true}
              content={review.reviewContent}
              images={review.reviewImageUrls}
              onUpdate={() =>
                navigate(`/shelters/${shelterId}/reviews/write/${reviewId}`)
              }
              onDelete={() => openDeleteModal(reviewId)}
            >
              <Box>
                <Text fontWeight={600} mb={2}>
                  {review.shelterName}
                </Text>
                <InfoSubtext
                  title="작성일"
                  content={createFormattedTime(
                    new Date(review.reviewCreatedAt),
                    'YY.MM.DD',
                  )}
                />
              </Box>
            </ReviewItem>
          );
        })}
      </VStack>
      <div ref={ref} />
      <AlertModal
        modalTitle="리뷰 삭제"
        modalContent="리뷰를 삭제하시겠어요?"
        btnTitle="삭제하기"
        isOpen={isOpen}
        onClose={() => {
          setDeleteReviewId(0);
          onClose();
        }}
        onClick={() => deleteReveiw(deleteReviewId)}
      />
    </Box>
  );
}
