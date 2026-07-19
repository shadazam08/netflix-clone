// src/server/mappers/device.mapper.ts

import { Prisma } from "@/generated/prisma/client";

import {
  DeviceResponseDto,
} from "@/server/dto";

type DeviceWithRelations =
  Prisma.DeviceGetPayload<{
    include: {
      user: true;
    };
  }>;

export class DeviceMapper {
  static toDto(
    device: DeviceWithRelations
  ): DeviceResponseDto {
    return {
      id: device.id,
      userId: device.userId,
      name: device.name,
      type: device.type,
      identifier: device.identifier,
      ipAddress: device.ipAddress,
      userAgent: device.userAgent,
      lastLoginAt: device.lastLoginAt,
      createdAt: device.createdAt,
    };
  }

  static toDtoList(
    devices: DeviceWithRelations[]
  ): DeviceResponseDto[] {
    return devices.map(
      (device) =>
        this.toDto(device)
    );
  }
}