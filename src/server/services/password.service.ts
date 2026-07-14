import bcrypt from "bcryptjs";

export class PasswordService {
  static async hash(password: string) {
    return bcrypt.hash(password, 12);
  }

  static async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}