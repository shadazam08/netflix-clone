import { NextRequest } from "next/server";

import { AUTH_MESSAGES } from "@/server/auth";
import { AuthMapper } from "@/server/mappers";
import { ApiResponse, handleApiError } from "@/server/lib";
import { AuthService } from "@/server/services";
import { loginSchema } from "@/server/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = loginSchema.parse(body);

    const authService = new AuthService();

    const user = await authService.validateUser(
      data.email,
      data.password
    );

    return ApiResponse.success(
      AuthMapper.toResponse(user),
      AUTH_MESSAGES.LOGIN_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}