import { z } from "zod";

export const createMediaSchema = z.object({
  contentId: z.string().cuid(),

  type: z.enum([
    "POSTER",
    "BANNER",
    "LOGO",
    "THUMBNAIL",
    "TRAILER",
    "VIDEO",
  ]),

  url: z.string().url("Invalid media URL."),

  publicId: z.string().trim().optional(),

  width: z.number().int().positive().optional(),

  height: z.number().int().positive().optional(),
});

export const updateMediaSchema =
  createMediaSchema.partial();