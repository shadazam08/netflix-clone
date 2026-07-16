import type { CategoryResponseDto } from "@/server/dto";
import type { CategoryModel } from "@/server/repositories";

export class CategoryMapper {
  static toResponse(
    category: CategoryModel
  ): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
    };
  }

  static toResponseList(
    categories: CategoryModel[]
  ): CategoryResponseDto[] {
    return categories.map((category) =>
      this.toResponse(category)
    );
  }
}