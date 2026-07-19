import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, NOTIFICATION_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { NotificationService } from "@/server/services";
import { updateNotificationSchema } from "@/server/validations";

const notificationService = new NotificationService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const notification = await notificationService.findById(id);

    return NextResponse.json(ApiResponse.success(notification, NOTIFICATION_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateNotificationSchema.parse(body);

    const notification = await notificationService.update(id, data);

    return NextResponse.json(ApiResponse.success(notification, NOTIFICATION_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await notificationService.delete(id);

    return NextResponse.json(ApiResponse.success(null, NOTIFICATION_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
