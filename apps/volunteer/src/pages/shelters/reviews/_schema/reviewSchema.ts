import { z } from 'zod';

export const reviewSchema = z.object({
  content: z
    .string()
    .optional()
    .refine((val) => val?.length && val.length < 500, '에러입니다'),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
