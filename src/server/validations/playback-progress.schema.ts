import { z } from "zod";

export const createPlaybackProgressSchema = z.object({
  profileId: z.string().cuid(),
  contentId: z.string().cuid(),
  episodeId: z.string().cuid().optional(),
  watchedSeconds: z.number().int().min(0).default(0),
  completed: z.boolean().default(false),
  lastPlayedAt: z.coerce.date().optional(),
});

export const updatePlaybackProgressSchema = z.object({
  episodeId: z.string().cuid().optional(),
  watchedSeconds: z.number().int().min(0).optional(),
  completed: z.boolean().optional(),
  lastPlayedAt: z.coerce.date().optional(),
});

export type CreatePlaybackProgressInput =
  z.infer<typeof createPlaybackProgressSchema>;

export type UpdatePlaybackProgressInput =
  z.infer<typeof updatePlaybackProgressSchema>;