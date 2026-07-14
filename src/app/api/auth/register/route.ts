import { NextRequest, NextResponse } from "next/server";
import { AUTH_MESSAGES } from "@/server/auth";
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
          message: AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
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
          message: AUTH_MESSAGES.ROLE_NOT_FOUND,
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
        message: AUTH_MESSAGES.REGISTRATION_SUCCESS,
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
        message: AUTH_MESSAGES.REGISTION_FAIL,
      },
      {
        status: 500,
      }
    );
  }
}