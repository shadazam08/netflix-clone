import { prisma } from '@/lib/prisma';
import { generateUniqueSlug } from '@/lib/slug';
import { CreateContentData, UpdateContentData } from '@/schemas/content';

export async function getMovies() {
  return prisma.content.findMany({
    where: {
      type: 'MOVIE',
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      releaseDate: true,
      createdAt: true,
    },
  });
}

export async function getMovieById(id: string) {
  return prisma.content.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      status: true,
      visibility: true,
      shortDescription: true,
      description: true,
      releaseDate: true,
      duration: true,
      ageRating: true,
      poster: true,
      banner: true,
      thumbnail: true,
      trailer: true,
      isFeatured: true,
      isTrending: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function createContentRepository(data: CreateContentData) {
  const slug = await generateUniqueSlug(data.title, async (value) => {
    const existing = await prisma.content.findUnique({
      where: {
        slug: value,
      },
      select: {
        id: true,
      },
    });

    return !!existing;
  });

  return prisma.content.create({
    data: {
      title: data.title,
      slug,
      type: data.type,
      status: data.status,
      visibility: 'PRIVATE',
      shortDescription: data.shortDescription,
      description: data.description,
      releaseDate: data.releaseDate,
      duration: data.duration,
      ageRating: data.ageRating,
      isFeatured: false,
      isTrending: false,
    },
  });
}

export async function updateContentRepository(data: UpdateContentData) {
  if (!data.id) {
    throw new Error('Content ID is required.');
  }

  return prisma.content.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      type: data.type,
      status: data.status,
      shortDescription: data.shortDescription,
      description: data.description,
      releaseDate: data.releaseDate,
      duration: data.duration,
      ageRating: data.ageRating,
    },
  });
}

export async function deleteContentRepository(id: string) {
  return prisma.content.delete({
    where: {
      id,
    },
  });
}
