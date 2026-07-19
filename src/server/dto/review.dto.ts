export interface CreateReviewDto {
  profileId: string;
  contentId: string;
  title?: string;
  review: string;
  isVisible?: boolean;
}

export interface UpdateReviewDto {
  title?: string;
  review?: string;
  isVisible?: boolean;
}

export interface ReviewResponseDto {
  id: string;
  profileId: string;
  contentId: string;
  title: string | null;
  review: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}
