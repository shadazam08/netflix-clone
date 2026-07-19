import { Prisma } from "@/generated/prisma/client";

import { HomepageSectionRepository } from "@/server/repositories";

import { HomepageSectionMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { HOMEPAGE_SECTION_MESSAGES } from "@/server/auth";

import { CreateHomepageSectionInput, UpdateHomepageSectionInput } from "@/server/validations";

export class HomepageSectionService {
  private readonly homepageSectionRepository = new HomepageSectionRepository();

  async findAll() {
    const sections = await this.homepageSectionRepository.findAll();

    return HomepageSectionMapper.toDtoList(sections);
  }

  async findById(id: string) {
    const section = await this.homepageSectionRepository.findById(id);

    if (!section) {
      throw new AppError(HOMEPAGE_SECTION_MESSAGES.NOT_FOUND, 404);
    }

    return HomepageSectionMapper.toDto(section);
  }

  async create(data: CreateHomepageSectionInput) {
    const existing = await this.homepageSectionRepository.findBySlug(data.slug);

    if (existing) {
      throw new AppError(HOMEPAGE_SECTION_MESSAGES.SLUG_ALREADY_EXISTS, 409);
    }

    const created = await this.homepageSectionRepository.create({
      title: data.title,
      slug: data.slug,
      type: data.type,
      isActive: data.isActive,
      displayOrder: data.displayOrder,
    } satisfies Prisma.HomepageSectionCreateInput);

    return HomepageSectionMapper.toDto(created);
  }

  async update(id: string, data: UpdateHomepageSectionInput) {
    await this.findById(id);

    const updateData: Prisma.HomepageSectionUpdateInput = {};

    if (data.slug !== undefined) {
      const existing = await this.homepageSectionRepository.findBySlug(data.slug);

      if (existing && existing.id !== id) {
        throw new AppError(HOMEPAGE_SECTION_MESSAGES.SLUG_ALREADY_EXISTS, 409);
      }

      updateData.slug = data.slug;
    }

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.type !== undefined) {
      updateData.type = data.type;
    }

    if (data.isActive !== undefined) {
      updateData.isActive = data.isActive;
    }

    if (data.displayOrder !== undefined) {
      updateData.displayOrder = data.displayOrder;
    }

    const updated = await this.homepageSectionRepository.update(id, updateData);

    return HomepageSectionMapper.toDto(updated);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.homepageSectionRepository.delete(id);
  }
}
