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

import {
  createMyListSchema,
} from "@/server/validations";

const myListService =
  new MyListService();

export async function GET() {
  try {
    const myList =
      await myListService.findAll();

    return NextResponse.json(
      ApiResponse.success(
        myList,
        MY_LIST_MESSAGES.LIST_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    await requireAdmin();

    const body =
      await request.json();

    const data =
      createMyListSchema.parse(
        body
      );

    const myList =
      await myListService.create(
        data
      );

    return NextResponse.json(
      ApiResponse.success(
        myList,
        MY_LIST_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}