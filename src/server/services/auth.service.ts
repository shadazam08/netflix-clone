import { UserRepository } from "@/server/repositories";
import { PasswordService } from "./password.service";

export class AuthService {
  private readonly users = new UserRepository();

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      return null;
    }

    const valid = await PasswordService.compare(
      password,
      user.password
    );

    if (!valid) {
      return null;
    }

    return user;
  }
}