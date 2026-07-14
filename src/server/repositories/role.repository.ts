import { BaseRepository } from "./base.repository";

export class RoleRepository extends BaseRepository {
  async findByName(name: string) {
    return this.db.role.findUnique({
      where: { name },
    });
  }

  async getDefaultUserRole() {
    return this.db.role.findUnique({
      where: {
        name: "USER",
      },
    });
  }
}