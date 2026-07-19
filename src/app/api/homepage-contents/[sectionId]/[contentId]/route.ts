import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, HOMEPAGE_CONTENT_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { HomepageContentService } from "@/server/services";

import { updateHomepageContentSchema } from "@/server/validations";

const homepageContentService = new HomepageContentService();

interface RouteContext {
  params: Promise<{
    sectionId: string;
    contentId: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { sectionId, contentId } = await context.params;

    const item = await homepageContentService.findById(sectionId, contentId);

    return NextResponse.json(ApiResponse.success(item, HOMEPAGE_CONTENT_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { sectionId, contentId } = await context.params;

    const body = await request.json();

    const data = updateHomepageContentSchema.parse(body);

    const item = await homepageContentService.update(sectionId, contentId, data);

    return NextResponse.json(ApiResponse.success(item, HOMEPAGE_CONTENT_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { sectionId, contentId } = await context.params;

    await homepageContentService.delete(sectionId, contentId);

    return NextResponse.json(ApiResponse.success(null, HOMEPAGE_CONTENT_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
