import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, ANNOUNCEMENT_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { AnnouncementService } from "@/server/services";

import { createAnnouncementSchema } from "@/server/validations";

const announcementService = new AnnouncementService();

export async function GET() {
  try {
    const announcements = await announcementService.findAll();

    return NextResponse.json(ApiResponse.success(announcements, ANNOUNCEMENT_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createAnnouncementSchema.parse(body);

    const announcement = await announcementService.create(data);

    return NextResponse.json(ApiResponse.success(announcement, ANNOUNCEMENT_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
