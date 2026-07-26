import { z } from 'zod';

export const contentSchema = z.object({
  id: z.string().optional(),

  type: z.enum(['MOVIE', 'TV_SHOW']),

  title: z.string().trim().min(1, 'Title is required').max(255),

  shortDescription: z.string().trim().optional(),

  description: z.string().trim().min(10, 'Description is required'),

  releaseDate: z.coerce.date().optional(),

  duration: z.coerce.number().positive('Duration must be greater than 0').optional(),

  ageRating: z.string().trim().optional(),

  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

export type ContentFormData = z.input<typeof contentSchema>;

export type CreateContentData = z.output<typeof contentSchema>;

export type UpdateContentData = z.output<typeof contentSchema>;
