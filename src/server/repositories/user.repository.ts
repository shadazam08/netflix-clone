import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository {
  async findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
      include: {
        role: true,
        profiles: true,
      },
    });
  }

  async findById(id: string) {
    return this.db.user.findUnique({
      where: { id },
      include: {
        role: true,
        profiles: true,
      },
    });
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
  }) {
    return this.db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        roleId: data.roleId,
        status: "ACTIVE",

        profiles: {
          create: {
            name: `${data.firstName} ${data.lastName}`,
            type: "ADULT",
            isPrimary: true,
            isLocked: false,
          },
        },
      },
      include: {
        role: true,
        profiles: true,
      },
    });
  }

  async exists(email: string) {
    const count = await this.db.user.count({
      where: { email },
    });

    return count > 0;
  }
}