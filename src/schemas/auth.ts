import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address.').trim().toLowerCase(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(100, 'Password is too long.'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters.')
      .max(100, 'Name is too long.'),

    email: z.email('Please enter a valid email address.').trim().toLowerCase(),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(100, 'Password is too long.'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

export type RegisterInput = z.infer<typeof registerSchema>;
