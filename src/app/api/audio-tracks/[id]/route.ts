import { NextResponse } from "next/server";
import { requireAdmin, AUDIO_TRACK_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { AudioTrackService } from "@/server/services";
import { updateAudioTrackSchema } from "@/server/validations";

const service = new AudioTrackService();

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const audioTrack = await service.findById(id);

    return NextResponse.json(ApiResponse.success(audioTrack, AUDIO_TRACK_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateAudioTrackSchema.parse(body);

    const audioTrack = await service.update(id, data);

    return NextResponse.json(ApiResponse.success(audioTrack, AUDIO_TRACK_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await service.delete(id);

    return NextResponse.json(ApiResponse.success(null, AUDIO_TRACK_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
