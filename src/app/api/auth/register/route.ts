import { NextRequest } from "next/server";

import { AUTH_MESSAGES } from "@/server/auth";
import { RegisterService } from "@/server/services";
import { RegisterMapper } from "@/server/mappers";
import { ApiResponse, handleApiError } from "@/server/lib";
import { registerSchema } from "@/server/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = registerSchema.parse(body);

    const service = new RegisterService();

    const user = await service.register(data);

    return ApiResponse.success(
      RegisterMapper.toResponse(user),
      AUTH_MESSAGES.REGISTRATION_SUCCESS,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}