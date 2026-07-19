import { z } from "zod";

export const createReviewSchema = z.object({
  profileId: z
    .string()
    .cuid(),

  contentId: z
    .string()
    .cuid(),

  title: z
    .string()
    .trim()
    .max(255)
    .optional(),

  review: z
    .string()
    .trim()
    .min(1)
    .max(5000),

  isVisible: z
    .boolean()
    .optional(),
});

export const updateReviewSchema = z.object({
  title: z
    .string()
    .trim()
    .max(255)
    .optional(),

  review: z
    .string()
    .trim()
    .min(1)
    .max(5000)
    .optional(),

  isVisible: z
    .boolean()
    .optional(),
});

export type CreateReviewInput =
  z.infer<typeof createReviewSchema>;

export type UpdateReviewInput =
  z.infer<typeof updateReviewSchema>;