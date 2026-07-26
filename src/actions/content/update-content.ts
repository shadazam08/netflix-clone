'use server';

import { revalidatePath } from 'next/cache';

import { errorResponse, successResponse } from '@/lib/action-response';
import { ERROR_MESSAGES, ROUTES, SUCCESS_MESSAGES } from '@/lib/constants';
import { validationError } from '@/lib/validation';
import { contentSchema, UpdateContentData } from '@/schemas/content';
import { updateContent } from '@/services/content.service';

export async function updateContentAction(data: UpdateContentData) {
  const parsed = contentSchema.safeParse(data);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const content = await updateContent(parsed.data);

    revalidatePath(ROUTES.ADMIN_MOVIES);
    revalidatePath(`${ROUTES.ADMIN_MOVIES}/${content.id}`);

    return successResponse(
      { id: content.id },
      `${ROUTES.ADMIN_MOVIES}/${content.id}`,
      SUCCESS_MESSAGES.CONTENT_UPDATED
    );
  } catch {
    return errorResponse(ERROR_MESSAGES.CONTENT_UPDATE_FAILED);
  }
}
