import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class IngredientResponseDto {
  id: number;
  name: string;
}

export class IngredientListResponseDto {
  items: IngredientResponseDto[];
}

export class CreateIngredientRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
