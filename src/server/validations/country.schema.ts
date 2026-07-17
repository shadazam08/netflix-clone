import { z } from "zod";

export const createCountrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Country name is required")
    .max(100, "Country name is too long"),

  code: z
    .string()
    .trim()
    .min(2, "Country code is required")
    .max(10, "Country code is too long"),
});

export const updateCountrySchema =
  createCountrySchema.partial();

export type CreateCountryInput =
  z.infer<typeof createCountrySchema>;

export type UpdateCountryInput =
  z.infer<typeof updateCountrySchema>;