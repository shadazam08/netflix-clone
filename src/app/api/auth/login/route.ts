import { NextRequest, NextResponse } from "next/server";

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
          message: "Invalid email or password.",
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
          message: "Account is not active.",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
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
        message: "Login failed.",
      },
      {
        status: 500,
      }
    );
  }
}