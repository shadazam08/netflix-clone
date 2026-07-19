import { z } from "zod";
import { VideoQuality } from "@/generated/prisma/client";

export const createVideoSourceSchema = z.object({
  contentId: z
    .string()
    .trim()
    .min(1, "Content ID is required."),

  episodeId: z
    .string()
    .trim()
    .min(1)
    .optional()
    .nullable(),

  quality: z.nativeEnum(VideoQuality),

  url: z
    .string()
    .trim()
    .url(),

  mimeType: z
    .string()
    .trim()
    .min(1)
    .max(100),

  fileSize: z
    .bigint()
    .optional()
    .nullable(),

  duration: z
    .number()
    .int()
    .positive(),

  bitrate: z
    .number()
    .int()
    .positive()
    .optional()
    .nullable(),

  codec: z
    .string()
    .trim()
    .max(100)
    .optional()
    .nullable(),

  isDefault: z
    .boolean()
    .optional(),
});

export const updateVideoSourceSchema =
  createVideoSourceSchema.partial();

export type CreateVideoSourceInput =
  z.infer<
    typeof createVideoSourceSchema
  >;

export type UpdateVideoSourceInput =
  z.infer<
    typeof updateVideoSourceSchema
  >;