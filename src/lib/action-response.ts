import { ActionResponse } from '@/types/action-response';

export function successResponse<T>(
  data?: T,
  redirectTo?: string,
  message?: string
): ActionResponse<T> {
  return {
    success: true,
    data,
    redirectTo,
    message,
  };
}

export function errorResponse(
  message: string,
  errors?: Record<string, string[] | undefined>
): ActionResponse {
  return {
    success: false,
    message,
    errors,
  };
}
