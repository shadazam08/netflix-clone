import { NextResponse } from "next/server";
import { requireAdmin, RATING_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { RatingService } from "@/server/services";
import { updateRatingSchema } from "@/server/validations";

const service = new RatingService();

type RouteContext = {
  params: Promise<{
    profileId: string;
    contentId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { profileId, contentId } = await context.params;

    const rating = await service.findById(profileId, contentId);

    return NextResponse.json(ApiResponse.success(rating, RATING_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { profileId, contentId } = await context.params;

    const body = await request.json();

    const data = updateRatingSchema.parse(body);

    const rating = await service.update(profileId, contentId, data);

    return NextResponse.json(ApiResponse.success(rating, RATING_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { profileId, contentId } = await context.params;

    await service.delete(profileId, contentId);

    return NextResponse.json(ApiResponse.success(null, RATING_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
