import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class SystemSettingRepository {
  async findAll() {
    return prisma.systemSetting.findMany({
      orderBy: {
        key: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.systemSetting.findUnique({
      where: {
        id,
      },
    });
  }

  async findByKey(key: string) {
    return prisma.systemSetting.findUnique({
      where: {
        key,
      },
    });
  }

  async create(data: Prisma.SystemSettingCreateInput) {
    return prisma.systemSetting.create({
      data,
    });
  }

  async update(id: string, data: Prisma.SystemSettingUpdateInput) {
    return prisma.systemSetting.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.systemSetting.delete({
      where: {
        id,
      },
    });
  }
}
