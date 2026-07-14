export interface ProfileResponseDto {
  id: string;
  name: string;
  avatar: string | null;
  type: string;
  language: string;
  isPrimary: boolean;
  isLocked: boolean;
}

export interface CreateProfileDto {
  name: string;
  type: "ADULT" | "KIDS";
}

export interface UpdateProfileDto {
  name?: string;
  avatar?: string | null;
}