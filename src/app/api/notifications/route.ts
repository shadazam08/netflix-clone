import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, NOTIFICATION_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { NotificationService } from "@/server/services";
import { createNotificationSchema } from "@/server/validations";

const notificationService = new NotificationService();

export async function GET() {
  try {
    const notifications = await notificationService.findAll();

    return NextResponse.json(ApiResponse.success(notifications, NOTIFICATION_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createNotificationSchema.parse(body);

    const notification = await notificationService.create(data);

    return NextResponse.json(ApiResponse.success(notification, NOTIFICATION_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
