import type {
  AudioTrack,
} from "@/generated/prisma/client";

import type {
  AudioTrackResponseDto,
} from "@/server/dto";

export class AudioTrackMapper {
  static toDto(
    audioTrack: AudioTrack
  ): AudioTrackResponseDto {
    return {
      id: audioTrack.id,
      contentId: audioTrack.contentId,
      language: audioTrack.language,
      type: audioTrack.type,
      url: audioTrack.url,
      createdAt: audioTrack.createdAt,
    };
  }

  static toDtoList(
    audioTracks: AudioTrack[]
  ): AudioTrackResponseDto[] {
    return audioTracks.map((audioTrack) =>
      this.toDto(audioTrack)
    );
  }
}