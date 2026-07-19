import { z } from "zod";

export const createTvShowSchema = z.object({
  contentId: z
    .string()
    .trim()
    .min(1, "Content ID is required."),
});

export const updateTvShowSchema =
  createTvShowSchema.partial();

export type CreateTvShowInput =
  z.infer<typeof createTvShowSchema>;

export type UpdateTvShowInput =
  z.infer<typeof updateTvShowSchema>;