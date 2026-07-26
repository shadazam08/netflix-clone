import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/schemas/auth';
import { authenticateUser } from '@/services/auth.service';

export const credentialsProvider = Credentials({
  name: 'Credentials',

  credentials: {
    email: {
      label: 'Email',
      type: 'email',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
  },

  async authorize(credentials) {
    const parsed = loginSchema.safeParse(credentials);

    if (!parsed.success) {
      return null;
    }

    return authenticateUser(parsed.data.email, parsed.data.password);
  },
});
