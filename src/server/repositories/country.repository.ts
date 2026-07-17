import { Prisma, type Country } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type CountryModel = Country;

export class CountryRepository extends BaseRepository {
  async findAll(): Promise<CountryModel[]> {
    return this.db.country.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string): Promise<CountryModel | null> {
    return this.db.country.findUnique({
      where: { id },
    });
  }

  async findByCode(code: string): Promise<CountryModel | null> {
    return this.db.country.findUnique({
      where: { code },
    });
  }

  async create(data: Prisma.CountryCreateInput): Promise<CountryModel> {
    return this.db.country.create({
      data,
    });
  }

  async update(id: string, data: Prisma.CountryUpdateInput): Promise<CountryModel> {
    return this.db.country.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<CountryModel> {
    return this.db.country.delete({
      where: { id },
    });
  }
}
