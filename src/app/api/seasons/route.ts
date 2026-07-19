import { NextResponse } from "next/server";

import {
  requireAdmin,
  SEASON_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  SeasonService,
} from "@/server/services";

import {
  createSeasonSchema,
} from "@/server/validations";

const service = new SeasonService();

export async function GET() {
  try {
    const seasons =
      await service.findAll();

    return NextResponse.json(
      ApiResponse.success(
        seasons,
        SEASON_MESSAGES.LIST_SUCCESS
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
      createSeasonSchema.parse(body);

    const season =
      await service.create(data);

    return NextResponse.json(
      ApiResponse.success(
        season,
        SEASON_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}