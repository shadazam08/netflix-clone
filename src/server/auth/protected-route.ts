import { NextRequest } from "next/server";

import { ApiResponse, handleApiError } from "@/server/lib";

import { getCurrentUser } from "./session";

export async function withAuth(
  request: NextRequest,
  handler: (
    request: NextRequest,
    user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>
  ) => Promise<Response>
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return ApiResponse.error("Unauthorized", 401);
    }

    return handler(request, user);
  } catch (error) {
    return handleApiError(error);
  }
}