import { NextRequest } from "next/server";

import { AUTH_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { AuthService } from "@/server/services";
import { loginSchema } from "@/server/validations";
import { toAuthResponseDto } from "@/server/dto";

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
      toAuthResponseDto(user),
      AUTH_MESSAGES.LOGIN_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}