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
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful.",
        user: {
          id: user.id,
          email: user.email,
          role: user.role.name,
        },
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Invalid request.",
      },
      {
        status: 400,
      }
    );
  }
}