import { z } from "zod";

export const createSystemSettingSchema = z.object({
  key: z
    .string()
    .trim()
    .min(1)
    .max(255),

  value: z
    .string()
    .trim()
    .min(1),
});

export const updateSystemSettingSchema = z.object({
  key: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .optional(),

  value: z
    .string()
    .trim()
    .min(1)
    .optional(),
});

export type CreateSystemSettingInput =
  z.infer<
    typeof createSystemSettingSchema
  >;

export type UpdateSystemSettingInput =
  z.infer<
    typeof updateSystemSettingSchema
  >;