export interface CategoryResponseDto {
  id: string;
  name: string;
  slug: string;
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
}

export type UpdateCategoryDto =
  Partial<CreateCategoryDto>;