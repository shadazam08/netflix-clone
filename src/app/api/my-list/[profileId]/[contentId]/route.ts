import { NextRequest, NextResponse } from "next/server";

import {
  requireAdmin,
  MY_LIST_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  MyListService,
} from "@/server/services";

const myListService =
  new MyListService();

interface RouteContext {
  params: Promise<{
    profileId: string;
    contentId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const {
      profileId,
      contentId,
    } = await context.params;

    const myList =
      await myListService.findById(
        profileId,
        contentId
      );

    return NextResponse.json(
      ApiResponse.success(
        myList,
        MY_LIST_MESSAGES.GET_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const {
      profileId,
      contentId,
    } = await context.params;

    await myListService.delete(
      profileId,
      contentId
    );

    return NextResponse.json(
      ApiResponse.success(
        null,
        MY_LIST_MESSAGES.DELETE_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}