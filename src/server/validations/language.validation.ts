import { LanguageCode } from "@/generated/prisma/client";
import { z } from "zod";

export const createLanguageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Language name is required")
    .max(100, "Language name is too long"),

  code: z.nativeEnum(LanguageCode),
});

export const updateLanguageSchema =
  createLanguageSchema.partial();

export type CreateLanguageInput =
  z.infer<typeof createLanguageSchema>;

export type UpdateLanguageInput =
  z.infer<typeof updateLanguageSchema>;