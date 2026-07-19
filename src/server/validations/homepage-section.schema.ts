import { z } from "zod";

import { HomepageRowType } from "@/generated/prisma/client";

export const createHomepageSectionSchema = z.object({
  title: z.string().trim().min(1).max(255),
  slug: z.string().trim().min(1).max(255),
  type: z.nativeEnum(HomepageRowType),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().min(0),
});

export const updateHomepageSectionSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  slug: z.string().trim().min(1).max(255).optional(),
  type: z.nativeEnum(HomepageRowType).optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export type CreateHomepageSectionInput = z.infer<typeof createHomepageSectionSchema>;

export type UpdateHomepageSectionInput = z.infer<typeof updateHomepageSectionSchema>;
