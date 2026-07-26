import { prisma } from '@/lib/prisma';
import { verifyPassword, hashPassword } from '@/lib/password';
import { UserRole, UserStatus } from '@prisma/client';

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  if (!user.password) {
    return null;
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  if (user.status !== 'ACTIVE') {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.avatar,
    role: user.role,
    status: user.status,
  };
}
export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      avatar: true,
      createdAt: true,
    },
  });

  return user;
}
