import { NextRequest } from "next/server";
import { AUTH_MESSAGES } from "@/server/auth";
import { AuthService } from "@/server/services";
import { loginSchema } from "@/server/validations";
import {
  ApiResponse,
  AppError,
  handleApiError,
} from "@/server/lib";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = loginSchema.parse(body);

    const authService = new AuthService();

    const user = await authService.validateUser(
      data.email,
      data.password
    );

    if (!user) {
      throw new AppError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        401
      );
    }

    if (user.status !== "ACTIVE") {
      throw new AppError(
        AUTH_MESSAGES.ACCOUNT_NOT_ACTIVE,
        403
      );
    }

    return ApiResponse.success(
      {
        id: user.id,
        email: user.email,
        role: user.role.name,
        profiles: user.profiles,
      },
      AUTH_MESSAGES.LOGIN_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}