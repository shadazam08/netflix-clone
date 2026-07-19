import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, HOMEPAGE_SECTION_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { HomepageSectionService } from "@/server/services";

import { updateHomepageSectionSchema } from "@/server/validations";

const homepageSectionService = new HomepageSectionService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const section = await homepageSectionService.findById(id);

    return NextResponse.json(ApiResponse.success(section, HOMEPAGE_SECTION_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateHomepageSectionSchema.parse(body);

    const section = await homepageSectionService.update(id, data);

    return NextResponse.json(ApiResponse.success(section, HOMEPAGE_SECTION_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await homepageSectionService.delete(id);

    return NextResponse.json(ApiResponse.success(null, HOMEPAGE_SECTION_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
