import { NextResponse } from "next/server";
import { requireAdmin, STUDIO_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { StudioService } from "@/server/services";
import { createStudioSchema } from "@/server/validations";

const service = new StudioService();

export async function GET() {
  try {
    const data = await service.findAll();

    return NextResponse.json(ApiResponse.success(data, STUDIO_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createStudioSchema.parse(body);

    const studio = await service.create(data);

    return NextResponse.json(ApiResponse.success(studio, STUDIO_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
