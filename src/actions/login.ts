'use server';

import { signIn } from '@/auth';
import { loginSchema } from '@/schemas/auth';
import { AuthError } from 'next-auth';

export async function loginAction(formData: FormData) {
  const values = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: 'Invalid email or password.',
      };
    }

    throw error;
  }
}
