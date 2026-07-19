import { NextResponse } from "next/server";

import {
  requireAdmin,
  AUDIO_TRACK_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  AudioTrackService,
} from "@/server/services";

import {
  createAudioTrackSchema,
} from "@/server/validations";

const service =
  new AudioTrackService();

export async function GET() {
  try {
    const audioTracks =
      await service.findAll();

    return NextResponse.json(
      ApiResponse.success(
        audioTracks,
        AUDIO_TRACK_MESSAGES.LIST_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: Request
) {
  try {
    await requireAdmin();

    const body =
      await request.json();

    const data =
      createAudioTrackSchema.parse(
        body
      );

    const audioTrack =
      await service.create(data);

    return NextResponse.json(
      ApiResponse.success(
        audioTrack,
        AUDIO_TRACK_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}