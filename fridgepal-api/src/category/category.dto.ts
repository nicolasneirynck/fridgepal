export class CategoryResponseDto {
  id: number;
  name: string;
}

export class CategoryListResponseDto {
  items: CategoryResponseDto[];
}

export class CreateCategoryRequestDto {
  name: string;
}
