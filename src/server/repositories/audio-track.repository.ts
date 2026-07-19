import {Prisma, type AudioTrack,} from "@/generated/prisma/client";
import { BaseRepository } from "./base.repository";

export type AudioTrackModel = AudioTrack;

export class AudioTrackRepository extends BaseRepository {
  async findAll(): Promise<AudioTrackModel[]> {
    return this.db.audioTrack.findMany({
      include: {
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(
    id: string
  ): Promise<AudioTrackModel | null> {
    return this.db.audioTrack.findUnique({
      where: {
        id,
      },
      include: {
        content: true,
      },
    });
  }

  async create(
    data: Prisma.AudioTrackCreateInput
  ): Promise<AudioTrackModel> {
    return this.db.audioTrack.create({
      data,
      include: {
        content: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.AudioTrackUpdateInput
  ): Promise<AudioTrackModel> {
    return this.db.audioTrack.update({
      where: {
        id,
      },
      data,
      include: {
        content: true,
      },
    });
  }

  async delete(
    id: string
  ): Promise<AudioTrackModel> {
    return this.db.audioTrack.delete({
      where: {
        id,
      },
    });
  }
}