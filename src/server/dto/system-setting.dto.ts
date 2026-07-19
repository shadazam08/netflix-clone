export interface CreateSystemSettingDto {
  key: string;
  value: string;
}

export interface UpdateSystemSettingDto {
  key?: string;
  value?: string;
}

export interface SystemSettingResponseDto {
  id: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}