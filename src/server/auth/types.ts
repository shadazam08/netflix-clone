import type { UserWithRelations } from "@/server/repositories";

export type AuthUser = UserWithRelations;

export interface LoginResult {
  user: AuthUser;
}

export interface RegisterResult {
  id: string;
  email: string;
}