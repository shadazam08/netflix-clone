import { z } from "zod";

import {
  AudioType,
  LanguageCode,
} from "@/generated/prisma/client";

export const createAudioTrackSchema =
  z.object({
    contentId: z
      .string()
      .trim()
      .min(1, "Content ID is required."),

    language: z.nativeEnum(
      LanguageCode
    ),

    type: z.nativeEnum(
      AudioType
    ),

    url: z
      .string()
      .trim()
      .url(),
  });

export const updateAudioTrackSchema =
  createAudioTrackSchema.partial();

export type CreateAudioTrackInput =
  z.infer<
    typeof createAudioTrackSchema
  >;

export type UpdateAudioTrackInput =
  z.infer<
    typeof updateAudioTrackSchema
  >;