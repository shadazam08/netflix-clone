import { NextResponse } from "next/server";
import { requireAdmin, EPISODE_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { EpisodeService } from "@/server/services";
import { createEpisodeSchema } from "@/server/validations";

const service = new EpisodeService();

export async function GET() {
  try {
    const episodes = await service.findAll();

    return NextResponse.json(ApiResponse.success(episodes, EPISODE_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createEpisodeSchema.parse(body);

    const episode = await service.create(data);

    return NextResponse.json(ApiResponse.success(episode, EPISODE_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
