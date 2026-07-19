import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, AUDIT_LOG_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { AuditLogService } from "@/server/services";

import { updateAuditLogSchema } from "@/server/validations";

const auditLogService = new AuditLogService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const auditLog = await auditLogService.findById(id);

    return NextResponse.json(ApiResponse.success(auditLog, AUDIT_LOG_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateAuditLogSchema.parse(body);

    const auditLog = await auditLogService.update(id, data);

    return NextResponse.json(ApiResponse.success(auditLog, AUDIT_LOG_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await auditLogService.delete(id);

    return NextResponse.json(ApiResponse.success(null, AUDIT_LOG_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
