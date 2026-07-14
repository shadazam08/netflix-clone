import type { UserWithRelations } from "@/server/repositories";

export type AuthUser = UserWithRelations;

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}