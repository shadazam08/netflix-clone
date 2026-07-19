import { z } from "zod";

export const createMyListSchema = z.object({
  profileId: z
    .string()
    .cuid(),

  contentId: z
    .string()
    .cuid(),
});

export type CreateMyListInput =
  z.infer<typeof createMyListSchema>;