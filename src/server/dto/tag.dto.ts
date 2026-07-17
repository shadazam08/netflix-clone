export interface TagResponseDto {
  id: string;
  name: string;
  slug: string;
}

export interface CreateTagDto {
  name: string;
  slug: string;
}

export type UpdateTagDto = Partial<CreateTagDto>;
