export interface MediaResponseDto {
  id: string;
  contentId: string;

  type: string;

  url: string;
  publicId: string | null;

  width: number | null;
  height: number | null;
}

export interface CreateMediaDto {
  contentId: string;

  type:
    | "POSTER"
    | "BANNER"
    | "LOGO"
    | "THUMBNAIL"
    | "TRAILER"
    | "VIDEO";

  url: string;

  publicId?: string;

  width?: number;

  height?: number;
}

export type UpdateMediaDto =
  Partial<CreateMediaDto>;