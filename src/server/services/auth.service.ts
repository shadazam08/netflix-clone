import { AUTH_MESSAGES } from "@/server/auth";
import { AppError } from "@/server/lib";
import { UserRepository } from "@/server/repositories";
import { PasswordService } from "./password.service";

export class AuthService {
  private readonly users = new UserRepository();

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new AppError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        401
      );
    }

    const valid = await PasswordService.compare(
      password,
      user.password
    );

    if (!valid) {
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

    return user;
  }
}