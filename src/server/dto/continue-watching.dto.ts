export interface CreateContinueWatchingDto {
  profileId: string;
  contentId: string;
  episodeId?: string;
  currentSecond: number;
}

export interface UpdateContinueWatchingDto {
  episodeId?: string;
  currentSecond?: number;
}

export interface ContinueWatchingResponseDto {
  profileId: string;
  contentId: string;
  episodeId: string | null;
  currentSecond: number;
  updatedAt: Date;
}