export interface CreateWatchHistoryDto {
  profileId: string;
  contentId: string;
  episodeId?: string;
  watchedSeconds?: number;
  completed?: boolean;
}

export interface UpdateWatchHistoryDto {
  episodeId?: string;
  watchedSeconds?: number;
  completed?: boolean;
}

export interface WatchHistoryResponseDto {
  id: string;
  profileId: string;
  contentId: string;
  episodeId: string | null;
  watchedSeconds: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}