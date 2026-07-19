import { z } from "zod";

export const createRolePermissionSchema = z.object({
  roleId: z.string().cuid(),
  permissionId: z.string().cuid(),
});

export type CreateRolePermissionInput = z.infer<typeof createRolePermissionSchema>;
