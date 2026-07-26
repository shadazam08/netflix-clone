'use server';

import { revalidatePath } from 'next/cache';
import { ERROR_MESSAGES, ROUTES, SUCCESS_MESSAGES } from '@/lib/constants';
import { errorResponse, successResponse } from '@/lib/action-response';
import { deleteContent } from '@/services/content.service';

export async function deleteContentAction(id: string) {
  try {
    await deleteContent(id);

    revalidatePath(ROUTES.ADMIN_MOVIES);

    return successResponse(undefined, ROUTES.ADMIN_MOVIES, SUCCESS_MESSAGES.CONTENT_DELETED);
  } catch {
    return errorResponse(ERROR_MESSAGES.CONTENT_DELETE_FAILED);
  }
}
