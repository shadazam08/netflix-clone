import { AUTH_MESSAGES } from "@/server/auth";
import { AppError } from "@/server/lib";
import { RoleRepository, UserRepository } from "@/server/repositories";

import { PasswordService } from "./password.service";

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class RegisterService {
  private readonly users = new UserRepository();
  private readonly roles = new RoleRepository();

  async register(data: RegisterUserData) {
    if (await this.users.exists(data.email)) {
      throw new AppError(
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
        409
      );
    }

    const role = await this.roles.getDefaultUserRole();

    if (!role) {
      throw new AppError(
        AUTH_MESSAGES.ROLE_NOT_FOUND,
        500
      );
    }

    const hashedPassword = await PasswordService.hash(
      data.password
    );

    return this.users.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      roleId: role.id,
    });
  }
}