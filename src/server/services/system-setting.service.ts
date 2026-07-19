import { Prisma } from "@/generated/prisma/client";

import { SystemSettingRepository } from "@/server/repositories";

import { SystemSettingMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { SYSTEM_SETTING_MESSAGES } from "@/server/auth";

import { CreateSystemSettingInput, UpdateSystemSettingInput } from "@/server/validations";

export class SystemSettingService {
  private readonly systemSettingRepository = new SystemSettingRepository();

  async findAll() {
    const settings = await this.systemSettingRepository.findAll();

    return SystemSettingMapper.toDtoList(settings);
  }

  async findById(id: string) {
    const setting = await this.systemSettingRepository.findById(id);

    if (!setting) {
      throw new AppError(SYSTEM_SETTING_MESSAGES.NOT_FOUND, 404);
    }

    return SystemSettingMapper.toDto(setting);
  }

  async create(data: CreateSystemSettingInput) {
    const existing = await this.systemSettingRepository.findByKey(data.key);

    if (existing) {
      throw new AppError(SYSTEM_SETTING_MESSAGES.KEY_ALREADY_EXISTS, 409);
    }

    const created = await this.systemSettingRepository.create({
      key: data.key,
      value: data.value,
    } satisfies Prisma.SystemSettingCreateInput);

    return SystemSettingMapper.toDto(created);
  }

  async update(id: string, data: UpdateSystemSettingInput) {
    await this.findById(id);

    if (data.key) {
      const existing = await this.systemSettingRepository.findByKey(data.key);

      if (existing && existing.id !== id) {
        throw new AppError(SYSTEM_SETTING_MESSAGES.KEY_ALREADY_EXISTS, 409);
      }
    }

    const updateData: Prisma.SystemSettingUpdateInput = {};

    if (data.key !== undefined) {
      updateData.key = data.key;
    }

    if (data.value !== undefined) {
      updateData.value = data.value;
    }

    const updated = await this.systemSettingRepository.update(id, updateData);

    return SystemSettingMapper.toDto(updated);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.systemSettingRepository.delete(id);
  }
}
