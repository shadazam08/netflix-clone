import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, AUDIT_LOG_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { AuditLogService } from "@/server/services";

import { createAuditLogSchema } from "@/server/validations";

const auditLogService = new AuditLogService();

export async function GET() {
  try {
    const auditLogs = await auditLogService.findAll();

    return NextResponse.json(ApiResponse.success(auditLogs, AUDIT_LOG_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createAuditLogSchema.parse(body);

    const auditLog = await auditLogService.create(data);

    return NextResponse.json(ApiResponse.success(auditLog, AUDIT_LOG_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
