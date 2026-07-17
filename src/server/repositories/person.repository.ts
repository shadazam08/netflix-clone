import {
  Prisma,
  type Person,
} from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type PersonModel = Person;

export class PersonRepository extends BaseRepository {
  async findAll(): Promise<PersonModel[]> {
    return this.db.person.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(
    id: string
  ): Promise<PersonModel | null> {
    return this.db.person.findUnique({
      where: { id },
    });
  }

  async findBySlug(
    slug: string
  ): Promise<PersonModel | null> {
    return this.db.person.findUnique({
      where: { slug },
    });
  }

  async create(
    data: Prisma.PersonCreateInput
  ): Promise<PersonModel> {
    return this.db.person.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.PersonUpdateInput
  ): Promise<PersonModel> {
    return this.db.person.update({
      where: { id },
      data,
    });
  }

  async delete(
    id: string
  ): Promise<PersonModel> {
    return this.db.person.delete({
      where: { id },
    });
  }
}