import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/server/db/prisma";

export class DeviceRepository {
  async findAll() {
    return prisma.device.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.device.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async findByIdentifier(identifier: string) {
    return prisma.device.findUnique({
      where: {
        identifier,
      },
    });
  }

  async create(data: Prisma.DeviceCreateInput) {
    return prisma.device.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(id: string, data: Prisma.DeviceUpdateInput) {
    return prisma.device.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.device.delete({
      where: { id },
    });
  }
}
