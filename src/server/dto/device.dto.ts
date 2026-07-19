import { DeviceType } from "@/generated/prisma/client";

export interface CreateDeviceDto {
  userId: string;
  name: string;
  type: DeviceType;
  identifier: string;
  ipAddress?: string;
  userAgent?: string;
  lastLoginAt?: Date;
}

export interface UpdateDeviceDto {
  name?: string;
  type?: DeviceType;
  identifier?: string;
  ipAddress?: string;
  userAgent?: string;
  lastLoginAt?: Date;
}

export interface DeviceResponseDto {
  id: string;
  userId: string;
  name: string;
  type: DeviceType;
  identifier: string;
  ipAddress: string | null;
  userAgent: string | null;
  lastLoginAt: Date | null;
  createdAt: Date;
}
