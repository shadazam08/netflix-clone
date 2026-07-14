import { NextRequest } from "next/server";
import { loginSchema } from "@/server/validations";
import { AuthService } from "@/server/services";
import { AUTH_MESSAGES } from "@/server/auth";
import { ApiResponse } from "@/server/lib/api-response";

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
      return ApiResponse.error(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        401
      );
    }

    if (user.status !== "ACTIVE") {
      return ApiResponse.error(
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
    console.error(error);

    return ApiResponse.error(
      AUTH_MESSAGES.LOGIN_FAILD,
      500
    );
  }
}