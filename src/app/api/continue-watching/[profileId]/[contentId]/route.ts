import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, CONTINUE_WATCHING_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { ContinueWatchingService } from "@/server/services";
import { updateContinueWatchingSchema } from "@/server/validations";

const continueWatchingService = new ContinueWatchingService();

interface RouteContext {
  params: Promise<{
    profileId: string;
    contentId: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { profileId, contentId } = await context.params;

    const continueWatching = await continueWatchingService.findById(profileId, contentId);

    return NextResponse.json(ApiResponse.success(continueWatching, CONTINUE_WATCHING_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { profileId, contentId } = await context.params;

    const body = await request.json();

    const data = updateContinueWatchingSchema.parse(body);

    const continueWatching = await continueWatchingService.update(profileId, contentId, data);

    return NextResponse.json(ApiResponse.success(continueWatching, CONTINUE_WATCHING_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { profileId, contentId } = await context.params;

    await continueWatchingService.delete(profileId, contentId);

    return NextResponse.json(ApiResponse.success(null, CONTINUE_WATCHING_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
