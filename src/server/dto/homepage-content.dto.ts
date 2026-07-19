export interface CreateHomepageContentDto {
  sectionId: string;
  contentId: string;
  displayOrder: number;
}

export interface UpdateHomepageContentDto {
  displayOrder?: number;
}

export interface HomepageContentResponseDto {
  sectionId: string;
  contentId: string;
  displayOrder: number;
}