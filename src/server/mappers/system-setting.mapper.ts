import { Prisma } from "@/generated/prisma/client";

import { SystemSettingResponseDto } from "@/server/dto";

type SystemSettingModel = Prisma.SystemSettingGetPayload<Record<string, never>>;

export class SystemSettingMapper {
  static toDto(systemSetting: SystemSettingModel): SystemSettingResponseDto {
    return {
      id: systemSetting.id,
      key: systemSetting.key,
      value: systemSetting.value,
      createdAt: systemSetting.createdAt,
      updatedAt: systemSetting.updatedAt,
    };
  }

  static toDtoList(systemSettings: SystemSettingModel[]): SystemSettingResponseDto[] {
    return systemSettings.map((systemSetting) => this.toDto(systemSetting));
  }
}
