export interface CreateMyListDto {
  profileId: string;
  contentId: string;
}

export interface MyListResponseDto {
  profileId: string;
  contentId: string;
  createdAt: Date;
}