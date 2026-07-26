'use server';

import { registerSchema } from '@/schemas/auth';
import { registerUser } from '@/services/auth.service';

export async function registerAction(formData: FormData) {
  const values = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const parsed = registerSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await registerUser(parsed.data.name, parsed.data.email, parsed.data.password);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed.',
    };
  }
}
