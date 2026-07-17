import { CreateCountryDto, CountryResponseDto, UpdateCountryDto } from "@/server/dto";
import { CountryMapper } from "@/server/mappers";
import { CountryRepository } from "@/server/repositories";
import { COUNTRY_MESSAGES } from "@/server/auth";

export class CountryService {
  private readonly countries = new CountryRepository();

  async getAll(): Promise<CountryResponseDto[]> {
    const countries = await this.countries.findAll();

    return CountryMapper.toDtoList(countries);
  }

  async getById(id: string): Promise<CountryResponseDto> {
    const country = await this.countries.findById(id);

    if (!country) {
      throw new Error(COUNTRY_MESSAGES.NOT_FOUND);
    }

    return CountryMapper.toDto(country);
  }

  async create(dto: CreateCountryDto): Promise<CountryResponseDto> {
    const existing = await this.countries.findByCode(dto.code);

    if (existing) {
      throw new Error(COUNTRY_MESSAGES.CODE_ALREADY_EXISTS);
    }

    const country = await this.countries.create({
      name: dto.name,
      code: dto.code,
    });

    return CountryMapper.toDto(country);
  }

  async update(id: string, dto: UpdateCountryDto): Promise<CountryResponseDto> {
    await this.getById(id);

    if (dto.code) {
      const existing = await this.countries.findByCode(dto.code);

      if (existing && existing.id !== id) {
        throw new Error(COUNTRY_MESSAGES.CODE_ALREADY_EXISTS);
      }
    }

    const country = await this.countries.update(id, dto);

    return CountryMapper.toDto(country);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);

    await this.countries.delete(id);
  }
}
