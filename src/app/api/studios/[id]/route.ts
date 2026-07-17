import { NextResponse } from "next/server";
import { requireAdmin, STUDIO_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { StudioService } from "@/server/services";
import { updateStudioSchema } from "@/server/validations";

const service = new StudioService();

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const studio = await service.findById(id);

    return NextResponse.json(ApiResponse.success(studio, STUDIO_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateStudioSchema.parse(body);

    const studio = await service.update(id, data);

    return NextResponse.json(ApiResponse.success(studio, STUDIO_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await service.delete(id);

    return NextResponse.json(ApiResponse.success(null, STUDIO_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
