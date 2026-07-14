import { NextRequest } from "next/server";
import { registerSchema } from "@/server/validations";
import { UserRepository, RoleRepository } from "@/server/repositories";
import { PasswordService } from "@/server/services";
import { AUTH_MESSAGES } from "@/server/auth";
import { ApiResponse } from "@/server/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = registerSchema.parse(body);

    const users = new UserRepository();
    const roles = new RoleRepository();

    if (await users.exists(data.email)) {
      return ApiResponse.error(
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
        409
      );
    }

    const role = await roles.getDefaultUserRole();

    if (!role) {
      return ApiResponse.error(
        AUTH_MESSAGES.ROLE_NOT_FOUND,
        500
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

    return ApiResponse.success(
      {
        id: user.id,
        email: user.email,
      },
      AUTH_MESSAGES.REGISTRATION_SUCCESS,
      201
    );
  } catch (error) {
    console.error(error);

    return ApiResponse.error(
      AUTH_MESSAGES.REGISTION_FAIL,
      500
    );
  }
}