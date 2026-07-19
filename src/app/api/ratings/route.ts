import { NextResponse } from "next/server";
import { requireAdmin, RATING_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { RatingService } from "@/server/services";
import { createRatingSchema } from "@/server/validations";

const service = new RatingService();

export async function GET() {
  try {
    const ratings = await service.findAll();

    return NextResponse.json(ApiResponse.success(ratings, RATING_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createRatingSchema.parse(body);

    const rating = await service.create(data);

    return NextResponse.json(ApiResponse.success(rating, RATING_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
