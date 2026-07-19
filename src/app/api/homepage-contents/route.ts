import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, HOMEPAGE_CONTENT_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { HomepageContentService } from "@/server/services";

import { createHomepageContentSchema } from "@/server/validations";

const homepageContentService = new HomepageContentService();

export async function GET() {
  try {
    const items = await homepageContentService.findAll();

    return NextResponse.json(ApiResponse.success(items, HOMEPAGE_CONTENT_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createHomepageContentSchema.parse(body);

    const item = await homepageContentService.create(data);

    return NextResponse.json(ApiResponse.success(item, HOMEPAGE_CONTENT_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
