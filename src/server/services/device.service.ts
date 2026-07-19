import { Prisma } from "@/generated/prisma/client";

import { DeviceRepository, UserRepository } from "@/server/repositories";

import { DeviceMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { DEVICE_MESSAGES } from "@/server/auth";

import { CreateDeviceInput, UpdateDeviceInput } from "@/server/validations";

export class DeviceService {
  private readonly deviceRepository = new DeviceRepository();

  private readonly userRepository = new UserRepository();

  async findAll() {
    const devices = await this.deviceRepository.findAll();

    return DeviceMapper.toDtoList(devices);
  }

  async findById(id: string) {
    const device = await this.deviceRepository.findById(id);

    if (!device) {
      throw new AppError(DEVICE_MESSAGES.NOT_FOUND, 404);
    }

    return DeviceMapper.toDto(device);
  }

  async create(data: CreateDeviceInput) {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new AppError(DEVICE_MESSAGES.USER_NOT_FOUND, 404);
    }

    const existing = await this.deviceRepository.findByIdentifier(data.identifier);

    if (existing) {
      throw new AppError(DEVICE_MESSAGES.IDENTIFIER_ALREADY_EXISTS, 409);
    }

    const created = await this.deviceRepository.create({
      user: {
        connect: {
          id: data.userId,
        },
      },
      name: data.name,
      type: data.type,
      identifier: data.identifier,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      lastLoginAt: data.lastLoginAt,
    } satisfies Prisma.DeviceCreateInput);

    return DeviceMapper.toDto(created);
  }

  async update(id: string, data: UpdateDeviceInput) {
    await this.findById(id);

    const updateData: Prisma.DeviceUpdateInput = {};

    if (data.identifier !== undefined) {
      const existing = await this.deviceRepository.findByIdentifier(data.identifier);

      if (existing && existing.id !== id) {
        throw new AppError(DEVICE_MESSAGES.IDENTIFIER_ALREADY_EXISTS, 409);
      }

      updateData.identifier = data.identifier;
    }

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.type !== undefined) {
      updateData.type = data.type;
    }

    if (data.ipAddress !== undefined) {
      updateData.ipAddress = data.ipAddress;
    }

    if (data.userAgent !== undefined) {
      updateData.userAgent = data.userAgent;
    }

    if (data.lastLoginAt !== undefined) {
      updateData.lastLoginAt = data.lastLoginAt;
    }

    const updated = await this.deviceRepository.update(id, updateData);

    return DeviceMapper.toDto(updated);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.deviceRepository.delete(id);
  }
}
