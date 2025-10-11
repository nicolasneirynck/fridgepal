export class IngredientResponseDto {
  id: number;
  name: string;
}

export class IngredientListResponseDto {
  items: IngredientResponseDto[];
}
