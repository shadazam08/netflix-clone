import { z } from "zod";

import { PermissionAction } from "@/generated/prisma/client";

export const createPermissionSchema = z.object({
  name: z.string().trim().min(1).max(255),
  resource: z.string().trim().min(1).max(255),
  action: z.nativeEnum(PermissionAction),
  description: z.string().optional(),
});

export const updatePermissionSchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  resource: z.string().trim().min(1).max(255).optional(),
  action: z.nativeEnum(PermissionAction).optional(),
  description: z.string().optional(),
});

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;

export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;
