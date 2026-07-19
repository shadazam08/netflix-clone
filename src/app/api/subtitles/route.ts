import { NextResponse } from "next/server";

import {
  requireAdmin,
  SUBTITLE_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  SubtitleService,
} from "@/server/services";

import {
  createSubtitleSchema,
} from "@/server/validations";

const service =
  new SubtitleService();

export async function GET() {
  try {
    const subtitles =
      await service.findAll();

    return NextResponse.json(
      ApiResponse.success(
        subtitles,
        SUBTITLE_MESSAGES.LIST_SUCCESS
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
      createSubtitleSchema.parse(
        body
      );

    const subtitle =
      await service.create(data);

    return NextResponse.json(
      ApiResponse.success(
        subtitle,
        SUBTITLE_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}