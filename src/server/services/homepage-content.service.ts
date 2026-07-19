import { Prisma } from "@/generated/prisma/client";

import { ContentRepository, HomepageContentRepository, HomepageSectionRepository } from "@/server/repositories";

import { HomepageContentMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { HOMEPAGE_CONTENT_MESSAGES } from "@/server/auth";

import { CreateHomepageContentInput, UpdateHomepageContentInput } from "@/server/validations";

export class HomepageContentService {
  private readonly homepageContentRepository = new HomepageContentRepository();

  private readonly homepageSectionRepository = new HomepageSectionRepository();

  private readonly contentRepository = new ContentRepository();

  async findAll() {
    const items = await this.homepageContentRepository.findAll();

    return HomepageContentMapper.toDtoList(items);
  }

  async findById(sectionId: string, contentId: string) {
    const item = await this.homepageContentRepository.findById(sectionId, contentId);

    if (!item) {
      throw new AppError(HOMEPAGE_CONTENT_MESSAGES.NOT_FOUND, 404);
    }

    return HomepageContentMapper.toDto(item);
  }

  async create(data: CreateHomepageContentInput) {
    const section = await this.homepageSectionRepository.findById(data.sectionId);

    if (!section) {
      throw new AppError(HOMEPAGE_CONTENT_MESSAGES.SECTION_NOT_FOUND, 404);
    }

    const content = await this.contentRepository.findById(data.contentId);

    if (!content) {
      throw new AppError(HOMEPAGE_CONTENT_MESSAGES.CONTENT_NOT_FOUND, 404);
    }

    const existing = await this.homepageContentRepository.findById(data.sectionId, data.contentId);

    if (existing) {
      throw new AppError(HOMEPAGE_CONTENT_MESSAGES.ALREADY_EXISTS, 409);
    }

    const created = await this.homepageContentRepository.create({
      section: {
        connect: {
          id: data.sectionId,
        },
      },
      content: {
        connect: {
          id: data.contentId,
        },
      },
      displayOrder: data.displayOrder,
    } satisfies Prisma.HomepageContentCreateInput);

    return HomepageContentMapper.toDto(created);
  }

  async update(sectionId: string, contentId: string, data: UpdateHomepageContentInput) {
    await this.findById(sectionId, contentId);

    const updateData: Prisma.HomepageContentUpdateInput = {};

    if (data.displayOrder !== undefined) {
      updateData.displayOrder = data.displayOrder;
    }

    const updated = await this.homepageContentRepository.update(sectionId, contentId, updateData);

    return HomepageContentMapper.toDto(updated);
  }

  async delete(sectionId: string, contentId: string) {
    await this.findById(sectionId, contentId);

    await this.homepageContentRepository.delete(sectionId, contentId);
  }
}
