export interface PersonResponseDto {
  id: string;
  name: string;
  slug: string;
  biography: string | null;
  profileImage: string | null;
  birthDate: Date | null;
  deathDate: Date | null;
  knownFor: string | null;
  isActive: boolean;
}

export interface CreatePersonDto {
  name: string;
  slug: string;
  biography?: string;
  profileImage?: string;
  birthDate?: Date;
  deathDate?: Date;
  knownFor?: string;
  isActive?: boolean;
}

export type UpdatePersonDto =
  Partial<CreatePersonDto>;