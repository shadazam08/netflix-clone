import { Prisma } from "@/generated/prisma/client";

export type AuthUser = Prisma.UserGetPayload<{
  include: {
    role: true;
    profiles: true;
  };
}>;

export interface LoginResult {
  user: AuthUser;
}

export interface RegisterResult {
  id: string;
  email: string;
}