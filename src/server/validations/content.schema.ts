import { z } from "zod";

export const createContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(255, "Title cannot exceed 255 characters."),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(255, "Slug cannot exceed 255 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers and hyphens."
    ),

  description: z
    .string()
    .trim()
    .min(1, "Description is required."),

  type: z.enum(["MOVIE", "TV_SHOW"]),

  visibility: z.enum(["PUBLIC", "PREMIUM"]),

  certification: z.enum([
    "U",
    "UA7",
    "UA13",
    "UA16",
    "A",
  ]),

  releaseDate: z.coerce.date().optional(),

  duration: z
    .number()
    .int()
    .positive()
    .optional(),
});

export const updateContentSchema =
  createContentSchema.partial();