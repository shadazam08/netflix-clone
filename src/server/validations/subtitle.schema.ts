import { z } from "zod";

import { LanguageCode, SubtitleFormat } from "@/generated/prisma/client";

export const createSubtitleSchema = z.object({
  contentId: z.string().trim().min(1, "Content ID is required."),

  language: z.nativeEnum(LanguageCode),

  format: z.nativeEnum(SubtitleFormat),

  url: z.string().trim().url(),
});

export const updateSubtitleSchema = createSubtitleSchema.partial();

export type CreateSubtitleInput = z.infer<typeof createSubtitleSchema>;

export type UpdateSubtitleInput = z.infer<typeof updateSubtitleSchema>;
