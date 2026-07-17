import type { Country } from "@/generated/prisma/client";

import type { CountryResponseDto } from "@/server/dto";

export class CountryMapper {
  static toDto(
    country: Country
  ): CountryResponseDto {
    return {
      id: country.id,
      name: country.name,
      code: country.code,
    };
  }

  static toDtoList(
    countries: Country[]
  ): CountryResponseDto[] {
    return countries.map((country) =>
      this.toDto(country)
    );
  }
}