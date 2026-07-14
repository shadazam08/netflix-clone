import { NextRequest } from "next/server";
import { AUTH_MESSAGES } from "@/server/auth";
import { ApiResponse, AppError, handleApiError } from "@/server/lib";
import { AuthMapper } from "@/server/mappers";
import { RoleRepository, UserRepository } from "@/server/repositories";
import { PasswordService } from "@/server/services";
import { registerSchema } from "@/server/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = registerSchema.parse(body);

    const users = new UserRepository();
    const roles = new RoleRepository();

    if (await users.exists(data.email)) {
      throw new AppError(
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
        409
      );
    }

    const role = await roles.getDefaultUserRole();

    if (!role) {
      throw new AppError(
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
      AuthMapper.toRegisterResponse(user),
      AUTH_MESSAGES.REGISTRATION_SUCCESS,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}