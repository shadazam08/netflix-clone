import { z } from "zod";

export const createWatchHistorySchema = z.object({
  profileId: z
    .string()
    .cuid(),

  contentId: z
    .string()
    .cuid(),

  episodeId: z
    .string()
    .cuid()
    .optional(),

  watchedSeconds: z
    .number()
    .int()
    .min(0)
    .optional(),

  completed: z
    .boolean()
    .optional(),
});

export const updateWatchHistorySchema = z.object({
  episodeId: z
    .string()
    .cuid()
    .optional(),

  watchedSeconds: z
    .number()
    .int()
    .min(0)
    .optional(),

  completed: z
    .boolean()
    .optional(),
});

export type CreateWatchHistoryInput =
  z.infer<
    typeof createWatchHistorySchema
  >;

export type UpdateWatchHistoryInput =
  z.infer<
    typeof updateWatchHistorySchema
  >;