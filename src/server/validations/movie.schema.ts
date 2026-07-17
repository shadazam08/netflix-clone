import { z } from "zod";

export const createMovieSchema = z.object({
  contentId: z
    .string()
    .trim()
    .min(1, "Content ID is required."),
});

export const updateMovieSchema =
  createMovieSchema.partial();

export type CreateMovieInput =
  z.infer<typeof createMovieSchema>;

export type UpdateMovieInput =
  z.infer<typeof updateMovieSchema>;