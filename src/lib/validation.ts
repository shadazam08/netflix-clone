import { ZodError } from "zod";

import { errorResponse } from "@/lib/action-response";
import { ERROR_MESSAGES } from "@/lib/constants";

export function validationError(error: ZodError) {
  return errorResponse(
    ERROR_MESSAGES.VALIDATION_FAILED,
    error.flatten().fieldErrors,
  );
}