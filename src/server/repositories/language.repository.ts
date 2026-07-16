import {
  Prisma,
  LanguageCode,
  type Language,
} from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type LanguageModel = Language;

export class LanguageRepository extends BaseRepository {
  async findAll(): Promise<LanguageModel[]> {
    return this.db.language.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(
    id: string
  ): Promise<LanguageModel | null> {
    return this.db.language.findUnique({
      where: { id },
    });
  }

  async findByCode(
    code: LanguageCode
  ): Promise<LanguageModel | null> {
    return this.db.language.findUnique({
      where: { code },
    });
  }

  async create(
    data: Prisma.LanguageCreateInput
  ): Promise<LanguageModel> {
    return this.db.language.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.LanguageUpdateInput
  ): Promise<LanguageModel> {
    return this.db.language.update({
      where: { id },
      data,
    });
  }

  async delete(
    id: string
  ): Promise<LanguageModel> {
    return this.db.language.delete({
      where: { id },
    });
  }
}