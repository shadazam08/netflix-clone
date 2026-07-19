import { HomepageRowType } from "@/generated/prisma/client";

export interface CreateHomepageSectionDto {
  title: string;
  slug: string;
  type: HomepageRowType;
  isActive?: boolean;
  displayOrder: number;
}

export interface UpdateHomepageSectionDto {
  title?: string;
  slug?: string;
  type?: HomepageRowType;
  isActive?: boolean;
  displayOrder?: number;
}

export interface HomepageSectionResponseDto {
  id: string;
  title: string;
  slug: string;
  type: HomepageRowType;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
