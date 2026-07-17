import { z } from "zod";

export const createStudioSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(255, "Name must not exceed 255 characters."),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(255, "Slug must not exceed 255 characters.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug may contain only lowercase letters, numbers and hyphens."
    ),
});

export const updateStudioSchema =
  createStudioSchema.partial();

export type CreateStudioInput =
  z.infer<typeof createStudioSchema>;

export type UpdateStudioInput =
  z.infer<typeof updateStudioSchema>;