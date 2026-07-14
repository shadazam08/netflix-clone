import { requireAdmin, requireSuperAdmin } from "./authorization";
import { requireAuth } from "./session";

export const AuthGuards = {
  auth: requireAuth,
  admin: requireAdmin,
  superAdmin: requireSuperAdmin,
};