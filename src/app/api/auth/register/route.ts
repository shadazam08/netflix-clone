import { NextRequest, NextResponse } from "next/server";

import { registerSchema } from "@/server/validations";
import { UserRepository, RoleRepository } from "@/server/repositories";
import { PasswordService } from "@/server/services";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = registerSchema.parse(body);

    const users = new UserRepository();
    const roles = new RoleRepository();

    if (await users.exists(data.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered.",
        },
        {
          status: 409,
        }
      );
    }

    const role = await roles.getDefaultUserRole();

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message: "Default role not found.",
        },
        {
          status: 500,
        }
      );
    }

    const password = await PasswordService.hash(data.password);

    const user = await users.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password,
      roleId: role.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful.",
        data: {
          id: user.id,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Registration failed.",
      },
      {
        status: 500,
      }
    );
  }
}