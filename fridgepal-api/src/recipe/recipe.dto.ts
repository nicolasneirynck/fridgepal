import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  IsInt,
  ArrayMinSize,
} from 'class-validator';

import { Type } from 'class-transformer';

// TODO kijken voor overerving NIET DRINGEND

// TODO nu enkel voor createRecipe validaties maar tis nu wel minder proper
// miss kijken of ik deze onderstaande dto's niet overal kan gebruiken?
class CreatedByDto {
  @IsInt()
  @Min(1)
  id: number;
}

class IngredientDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  amount?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  unit?: string | null;
}

class InstrucionDto {
  @IsInt()
  @Min(1)
  stepNumber: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;
}

// RESPONSES
export class RecipeShortResponseDto {
  id: number;
  name: string;
  imageUrl: string | null; // niet verplicht -> front-end voorziet default afbeelding
  createdBy: {
    id: number; // id  nodig?
    userName: string;
  };
  ingredients: string[];
  time: number; // voor later filter
  categories: number[]; // voor later filter;
  // ratings?:
  //   | {
  //       userId: number;
  //       userName: string;
  //       rating: number;
  //     }[]
  //   | null; // als nog geen stemmen
  // ratingSummary?: {
  //   average: number;
  //   count: number;
} // voor later filter

export class RecipeListResponseDto {
  items: RecipeShortResponseDto[];
}
export class RecipeDetailResponseDto {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null; // niet verplicht -> front-end voorziet default afbeelding
  time: number;
  createdBy: {
    id: number; // id miss zinvol later?
    userName: string;
  };
  createdAt: Date;
  ingredients: {
    name: string;
    amount: number | null;
    unit: string | null;
  }[];
  instructions: {
    stepNumber: number;
    description: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[]; // voor later filter; id nodig?
  //rating: xx
  // ratingSummary: {
  //   average: number | null;
  //   count: number;
  // };
}

// REQUESTS
export class CreateRecipeRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  imageUrl?: string | null;

  @IsInt()
  @Min(0)
  time: number;

  @ValidateNested()
  @Type(() => CreatedByDto)
  createdBy: CreatedByDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InstrucionDto)
  instructions: InstrucionDto[];

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  categories: number[];
}

export class UpdateRecipeRequestDto extends CreateRecipeRequestDto {}
