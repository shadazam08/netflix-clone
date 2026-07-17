import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().trim().min(1, "Tag name is required").max(100, "Tag name is too long"),

  slug: z.string().trim().min(1, "Slug is required").max(150, "Slug is too long"),
});

export const updateTagSchema = createTagSchema.partial();

export type CreateTagInput = z.infer<typeof createTagSchema>;

export type UpdateTagInput = z.infer<typeof updateTagSchema>;
