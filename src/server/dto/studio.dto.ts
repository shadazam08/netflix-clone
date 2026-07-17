export interface StudioResponseDto {
  id: string;
  name: string;
  slug: string;
}

export interface CreateStudioDto {
  name: string;
  slug: string;
}

export type UpdateStudioDto =
  Partial<CreateStudioDto>;