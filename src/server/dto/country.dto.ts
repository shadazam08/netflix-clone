export interface CountryResponseDto {
  id: string;
  name: string;
  code: string;
}

export interface CreateCountryDto {
  name: string;
  code: string;
}

export type UpdateCountryDto =
  Partial<CreateCountryDto>;