import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(255),

  slug: z.string().trim().min(1, "Slug is required.").max(255),

  description: z.string().trim().min(1, "Description is required."),

  overview: z.string().trim().nullable().optional(),

  tagline: z.string().trim().nullable().optional(),

  status: z.enum(["DRAFT", "UNDER_REVIEW", "PUBLISHED", "INACTIVE", "ARCHIVED"]),

  visibility: z.enum(["PUBLIC", "PREMIUM"]),

  certification: z.enum(["U", "UA7", "UA13", "UA16", "A"]),

  releaseDate: z.coerce.date().nullable().optional(),

  releaseYear: z.number().int().nullable().optional(),

  duration: z.number().int().positive().nullable().optional(),

  isFeatured: z.boolean(),

  isTrending: z.boolean(),

  posterUrl: z.string().trim().nullable().optional(),

  bannerUrl: z.string().trim().nullable().optional(),

  logoUrl: z.string().trim().nullable().optional(),

  thumbnailUrl: z.string().trim().nullable().optional(),

  countryId: z.string().trim().nullable().optional(),

  studioId: z.string().trim().nullable().optional(),
});

export const updateMovieSchema = createMovieSchema.partial();

export type CreateMovieInput = z.infer<typeof createMovieSchema>;

export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
