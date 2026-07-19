export interface CreatePlaybackProgressDto {
  profileId: string;
  contentId: string;
  episodeId?: string;
  watchedSeconds?: number;
  completed?: boolean;
  lastPlayedAt?: Date;
}

export interface UpdatePlaybackProgressDto {
  episodeId?: string;
  watchedSeconds?: number;
  completed?: boolean;
  lastPlayedAt?: Date;
}

export interface PlaybackProgressResponseDto {
  id: string;
  profileId: string;
  contentId: string;
  episodeId: string | null;
  watchedSeconds: number;
  completed: boolean;
  lastPlayedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
