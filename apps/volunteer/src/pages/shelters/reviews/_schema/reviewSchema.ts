import { z } from 'zod';

import { MAX_REVIEW_CONTENTS_LENGTH } from '@/pages/shelters/reviews/_constants/reviews';

export const reviewSchema = z.object({
  content: z
    .string()
    .optional()
    .refine(
      (val) => val?.length && val.length < MAX_REVIEW_CONTENTS_LENGTH,
      '에러입니다',
    ),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
