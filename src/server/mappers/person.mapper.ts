import type { Person } from "@/generated/prisma/client";

import type { PersonResponseDto } from "@/server/dto";

export class PersonMapper {
  static toDto(person: Person): PersonResponseDto {
    return {
      id: person.id,
      name: person.name,
      slug: person.slug,
      biography: person.biography,
      profileImage: person.profileImage,
      birthDate: person.birthDate,
      deathDate: person.deathDate,
      knownFor: person.knownFor,
      isActive: person.isActive,
    };
  }

  static toDtoList(people: Person[]): PersonResponseDto[] {
    return people.map((person) => this.toDto(person));
  }
}
