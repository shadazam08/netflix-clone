export interface CreateAnnouncementDto {
  title: string;
  message: string;
  isActive?: boolean;
  startsAt?: Date;
  endsAt?: Date;
}

export interface UpdateAnnouncementDto {
  title?: string;
  message?: string;
  isActive?: boolean;
  startsAt?: Date;
  endsAt?: Date;
}

export interface AnnouncementResponseDto {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
  startsAt: Date | null;
  endsAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}