import { z } from "zod";

export const createHomepageContentSchema = z.object({
  sectionId: z.string().cuid(),
  contentId: z.string().cuid(),
  displayOrder: z.number().int().min(0),
});

export const updateHomepageContentSchema = z.object({
  displayOrder: z.number().int().min(0).optional(),
});

export type CreateHomepageContentInput = z.infer<typeof createHomepageContentSchema>;

export type UpdateHomepageContentInput = z.infer<typeof updateHomepageContentSchema>;
