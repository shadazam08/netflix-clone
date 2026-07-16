import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required.")
    .max(100, "Category name cannot exceed 100 characters."),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(100, "Slug cannot exceed 100 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers and hyphens."
    ),
});

export const updateCategorySchema =
  createCategorySchema.partial();