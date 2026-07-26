'use server';

import { revalidatePath } from 'next/cache';

import { errorResponse, successResponse } from '@/lib/action-response';
import { ERROR_MESSAGES, ROUTES, SUCCESS_MESSAGES } from '@/lib/constants';
import { validationError } from '@/lib/validation';
import { contentSchema, CreateContentData } from '@/schemas/content';
import { createContent } from '@/services/content.service';

export async function createContentAction(data: CreateContentData) {
  const parsed = contentSchema.safeParse(data);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const content = await createContent(parsed.data);

    revalidatePath(ROUTES.ADMIN_MOVIES);

    return successResponse(
      { id: content.id },
      `${ROUTES.ADMIN_MOVIES}/${content.id}`,
      SUCCESS_MESSAGES.CONTENT_CREATED
    );
  } catch {
    return errorResponse(ERROR_MESSAGES.CONTENT_CREATE_FAILED);
  }
}
