import { z } from "zod";

export const createPersonSchema = z.object({
  name: z.string().trim().min(1).max(255),

  slug: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),

  biography: z.string().trim().optional(),

  profileImage: z
    .string()
    .trim()
    .url()
    .optional(),

  birthDate: z.coerce.date().optional(),

  deathDate: z.coerce.date().optional(),

  knownFor: z.string().trim().optional(),

  isActive: z.boolean().optional(),
});

export const updatePersonSchema =
  createPersonSchema.partial();

export type CreatePersonInput =
  z.infer<typeof createPersonSchema>;

export type UpdatePersonInput =
  z.infer<typeof updatePersonSchema>;