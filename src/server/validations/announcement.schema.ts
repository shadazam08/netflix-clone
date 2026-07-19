import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().trim().min(1).max(255),
  message: z.string().trim().min(1),
  isActive: z.boolean().optional(),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),
});

export const updateAnnouncementSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  message: z.string().trim().min(1).optional(),
  isActive: z.boolean().optional(),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;

export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;
