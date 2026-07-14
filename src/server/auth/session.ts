import { auth } from "@/auth";

export async function getCurrentSession() {
  return auth();
}

export async function getCurrentUser() {
  const session = await auth();

  return session?.user ?? null;
}

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}