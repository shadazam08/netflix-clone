import { z } from "zod";

export const createContinueWatchingSchema =
  z.object({
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

    currentSecond: z
      .number()
      .int()
      .min(0),
  });

export const updateContinueWatchingSchema =
  z.object({
    episodeId: z
      .string()
      .cuid()
      .optional(),

    currentSecond: z
      .number()
      .int()
      .min(0)
      .optional(),
  });

export type CreateContinueWatchingInput =
  z.infer<
    typeof createContinueWatchingSchema
  >;

export type UpdateContinueWatchingInput =
  z.infer<
    typeof updateContinueWatchingSchema
  >;