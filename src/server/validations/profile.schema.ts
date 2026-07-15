import { z } from "zod";

export const createProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Profile name must be at least 2 characters.")
    .max(30, "Profile name cannot exceed 30 characters."),

  type: z.enum(["ADULT", "KIDS"]),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Profile name must be at least 2 characters.")
    .max(30, "Profile name cannot exceed 30 characters.")
    .optional(),

  avatar: z
    .string()
    .url("Avatar must be a valid URL.")
    .nullable()
    .optional(),
});