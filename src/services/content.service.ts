import {
  CreateContentData,
  UpdateContentData,
} from "@/schemas/content";

import {
  createContentRepository,
  deleteContentRepository,
  getMovieById,
  getMovies,
  updateContentRepository,
} from "@/repositories/content.repository";

export async function listMovies() {
  return getMovies();
}

export async function findMovieById(id: string) {
  return getMovieById(id);
}

export async function createContent(
  data: CreateContentData,
) {
  return createContentRepository(data);
}

export async function updateContent(
  data: UpdateContentData,
) {
  return updateContentRepository(data);
}

export async function deleteContent(id: string) {
  return deleteContentRepository(id);
}