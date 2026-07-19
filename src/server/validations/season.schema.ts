import { z } from "zod";

export const createSeasonSchema = z.object({
  tvShowId: z.string().trim().min(1, "TV Show ID is required."),

  seasonNumber: z.number().int().positive(),

  title: z.string().trim().min(1, "Title is required.").max(255),
});

export const updateSeasonSchema = createSeasonSchema.partial();

export type CreateSeasonInput = z.infer<typeof createSeasonSchema>;

export type UpdateSeasonInput = z.infer<typeof updateSeasonSchema>;
