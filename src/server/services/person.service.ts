import { CreatePersonDto, PersonResponseDto, UpdatePersonDto } from "@/server/dto";
import { PERSON_MESSAGES } from "@/server/auth";
import { PersonMapper } from "@/server/mappers";
import { PersonRepository } from "@/server/repositories";

export class PersonService {
  private readonly people = new PersonRepository();

  async getAll(): Promise<PersonResponseDto[]> {
    const people = await this.people.findAll();

    return PersonMapper.toDtoList(people);
  }

  async getById(id: string): Promise<PersonResponseDto> {
    const person = await this.people.findById(id);

    if (!person) {
      throw new Error(PERSON_MESSAGES.NOT_FOUND);
    }

    return PersonMapper.toDto(person);
  }

  async create(dto: CreatePersonDto): Promise<PersonResponseDto> {
    const existingSlug = await this.people.findBySlug(dto.slug);

    if (existingSlug) {
      throw new Error(PERSON_MESSAGES.SLUG_EXISTS);
    }

    const people = await this.people.findAll();

    const existingName = people.find((person) => person.name.toLowerCase() === dto.name.toLowerCase());

    if (existingName) {
      throw new Error(PERSON_MESSAGES.NAME_EXISTS);
    }

    const person = await this.people.create({
      name: dto.name,
      slug: dto.slug,
      biography: dto.biography,
      profileImage: dto.profileImage,
      birthDate: dto.birthDate,
      deathDate: dto.deathDate,
      knownFor: dto.knownFor,
      isActive: dto.isActive ?? true,
    });

    return PersonMapper.toDto(person);
  }

  async update(id: string, dto: UpdatePersonDto): Promise<PersonResponseDto> {
    await this.getById(id);

    if (dto.slug) {
      const existingSlug = await this.people.findBySlug(dto.slug);

      if (existingSlug && existingSlug.id !== id) {
        throw new Error(PERSON_MESSAGES.SLUG_EXISTS);
      }
    }

    if (dto.name) {
      const people = await this.people.findAll();

      const existingName = people.find(
        (person) => person.name.toLowerCase() === dto.name!.toLowerCase() && person.id !== id,
      );

      if (existingName) {
        throw new Error(PERSON_MESSAGES.NAME_EXISTS);
      }
    }

    const person = await this.people.update(id, {
      name: dto.name,
      slug: dto.slug,
      biography: dto.biography,
      profileImage: dto.profileImage,
      birthDate: dto.birthDate,
      deathDate: dto.deathDate,
      knownFor: dto.knownFor,
      isActive: dto.isActive,
    });

    return PersonMapper.toDto(person);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);

    await this.people.delete(id);
  }
}
