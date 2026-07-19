import { z } from "zod";

export const createEpisodeSchema = z.object({
  seasonId: z.string().trim().min(1, "Season ID is required."),

  episodeNumber: z.number().int().positive(),

  title: z.string().trim().min(1, "Title is required.").max(255),

  duration: z.number().int().positive().nullable().optional(),
});

export const updateEpisodeSchema = createEpisodeSchema.partial();

export type CreateEpisodeInput = z.infer<typeof createEpisodeSchema>;

export type UpdateEpisodeInput = z.infer<typeof updateEpisodeSchema>;
