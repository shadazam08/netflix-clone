import { Prisma } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type ProfileWithUser = Prisma.ProfileGetPayload<{
  include: {
    user: true;
  };
}>;

export class ProfileRepository extends BaseRepository {
  async findById(
    id: string
  ): Promise<ProfileWithUser | null> {
    return this.db.profile.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async findByUserId(
    userId: string
  ): Promise<ProfileWithUser[]> {
    return this.db.profile.findMany({
      where: { userId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async create(data: {
    userId: string;
    name: string;
    type: "ADULT" | "KIDS";
  }): Promise<ProfileWithUser> {
    return this.db.profile.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      avatar?: string | null;
    }
  ): Promise<ProfileWithUser> {
    return this.db.profile.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    return this.db.profile.delete({
      where: { id },
    });
  }
}