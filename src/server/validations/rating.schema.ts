import { z } from "zod";

import { RatingValue } from "@/generated/prisma/client";

export const createRatingSchema = z.object({
  profileId: z.string().trim().min(1, "Profile ID is required."),

  contentId: z.string().trim().min(1, "Content ID is required."),

  value: z.nativeEnum(RatingValue),
});

export const updateRatingSchema = z.object({
  value: z.nativeEnum(RatingValue),
});

export type CreateRatingInput = z.infer<typeof createRatingSchema>;

export type UpdateRatingInput = z.infer<typeof updateRatingSchema>;
