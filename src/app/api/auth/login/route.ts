import { NextRequest, NextResponse } from "next/server";
import { AUTH_MESSAGES } from "@/server/auth";
import { loginSchema } from "@/server/validations";
import { AuthService } from "@/server/services";

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
      return NextResponse.json(
        {
          success: false,
          message: AUTH_MESSAGES.INVALID_CREDENTIALS,
        },
        {
          status: 401,
        }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          message: AUTH_MESSAGES.ACCOUNT_NOT_ACTIVE,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: AUTH_MESSAGES.LOGIN_SUCCESS,
        data: {
          id: user.id,
          email: user.email,
          role: user.role.name,
          profiles: user.profiles,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: AUTH_MESSAGES.LOGIN_FAILD,
      },
      {
        status: 500,
      }
    );
  }
}