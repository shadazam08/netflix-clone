import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, ANNOUNCEMENT_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { AnnouncementService } from "@/server/services";

import { updateAnnouncementSchema } from "@/server/validations";

const announcementService = new AnnouncementService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const announcement = await announcementService.findById(id);

    return NextResponse.json(ApiResponse.success(announcement, ANNOUNCEMENT_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateAnnouncementSchema.parse(body);

    const announcement = await announcementService.update(id, data);

    return NextResponse.json(ApiResponse.success(announcement, ANNOUNCEMENT_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await announcementService.delete(id);

    return NextResponse.json(ApiResponse.success(null, ANNOUNCEMENT_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
