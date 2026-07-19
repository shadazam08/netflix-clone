import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, HOMEPAGE_SECTION_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { HomepageSectionService } from "@/server/services";

import { createHomepageSectionSchema } from "@/server/validations";

const homepageSectionService = new HomepageSectionService();

export async function GET() {
  try {
    const sections = await homepageSectionService.findAll();

    return NextResponse.json(ApiResponse.success(sections, HOMEPAGE_SECTION_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createHomepageSectionSchema.parse(body);

    const section = await homepageSectionService.create(data);

    return NextResponse.json(ApiResponse.success(section, HOMEPAGE_SECTION_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
