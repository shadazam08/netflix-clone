import { ZodError } from "zod";

import { ApiResponse } from "./api-response";
import { AppError } from "./app-error";

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return ApiResponse.error(
      "Validation failed.",
      400,
      error.flatten()
    );
  }

  if (error instanceof AppError) {
    return ApiResponse.error(
      error.message,
      error.statusCode
    );
  }

  console.error(error);

  return ApiResponse.error(
    "Internal server error.",
    500
  );
}