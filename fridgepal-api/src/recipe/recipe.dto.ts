import {
  IsArray,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  ArrayMinSize,
} from 'class-validator';

import { IsString, IsNumber } from 'nestjs-swagger-dto';

import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

// TODO kijken voor overerving NIET DRINGEND

// TODO nu enkel voor createRecipe validaties maar tis nu wel minder proper
// miss kijken of ik deze onderstaande dto's niet overal kan gebruiken?
class CreatedByDto {
  @IsNumber({ name: 'id', min: 1, type: 'integer', format: 'int32' })
  id: number;
}

class IngredientDto {
  //@IsInt()
  @IsNumber({ name: 'id', min: 1, type: 'integer', format: 'int32' })
  //@Min(1)
  id: number;

  @IsString({ name: 'name', maxLength: 255 })
  @IsNotEmpty()
  // @MaxLength(255)
  name: string;

  @IsOptional()
  @IsNumber({
    name: 'amount',
    min: 0,
    type: 'integer',
    nullable: true,
    format: 'int32',
  })
  //@IsInt()
  //@Min(0)
  amount?: number | null;

  @IsOptional()
  @IsString({ name: 'unit', maxLength: 20, nullable: true })
  //@MaxLength(20)
  unit?: string | null;
}

class InstructionDto {
  @IsNumber({ name: 'stepNumber', min: 1, type: 'integer', format: 'int32' })
  stepNumber: number;

  @IsString({ name: 'description', maxLength: 1000 })
  @IsNotEmpty()
  description: string;
}

// RESPONSES
export class RecipeShortResponseDto {
  @ApiProperty({
    example: 42,
    description: 'ID of the recipe.',
  })
  id: number;
  @ApiProperty({
    example: 'Pasta Bolognese',
    description: 'Name of the recipe.',
  })
  name: string;
  @ApiProperty({
    example: 'https://example.com/images/pasta.jpg',
    nullable: true,
    description:
      'Image URL for the recipe preview. If null, the front-end displays a default image.',
  })
  imageUrl: string | null; // niet verplicht -> front-end voorziet default afbeelding
  @ApiProperty({
    description: 'Information about the user who created the recipe.',
    example: {
      id: 12,
      firstName: 'Nicolas',
      lastName: 'Neirynck',
    },
  })
  createdBy: {
    id: number; // id  nodig?
    firstName: string;
    lastName: string;
  };
  @ApiProperty({
    description: 'List of ingredient names used in this recipe.',
    example: ['Paprika', 'Tomaat', 'Olijfolie'],
  })
  ingredients: string[];
  @ApiProperty({
    example: 20,
    description: 'Estimated preparation time in minutes.',
  })
  time: number; // voor later filter
  @ApiProperty({
    description: 'List of category names associated with the recipe.',
    example: ['Vegetarisch', 'Italiaans'],
  })
  categories: string[];
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
  @ApiProperty({
    type: () => [RecipeShortResponseDto],
    description: 'List of recipes returned by the API.',
  })
  items: RecipeShortResponseDto[];
}
export class RecipeDetailResponseDto {
  @ApiProperty({ example: 1, description: 'ID of the recipe.' })
  id: number;
  @ApiProperty({
    example: 'Pasta Bolognese',
    description: 'Name of the recipe',
  })
  name: string;
  @ApiProperty({
    example: 'Een klassieke Italiaanse pasta met een rijke saus.',
    description: 'Description of the recipe. Optional',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    example: 'https://example.com/images/pasta.jpg',
    nullable: true,
    description:
      'URL pointing to the recipe image. If null, the front-end will use a default image.',
  })
  imageUrl: string | null;
  @ApiProperty({
    example: 30,
    description: 'Estimated time to prepare the recipe, in minutes.',
  })
  time: number;
  @ApiProperty({
    type: () => CreatedByDto,
    description: 'Information about the user who created the recipe.',
    example: {
      id: 12,
      firstName: 'Nicolas',
      lastName: 'Neirynck',
      type: 'integer',
    },
  })
  createdBy: {
    id: number; // id miss zinvol later?
    firstName: string;
    lastName: string;
  };
  @ApiProperty({
    description: 'Timestamp indicating when the recipe was created.',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: () => [IngredientDto],
    description: 'List of ingredients required for the recipe.',
  })
  ingredients: {
    name: string;
    amount: number | null;
    unit: string | null;
  }[];
  @ApiProperty({
    type: () => [InstructionDto],
    description: 'Sequential steps explaining how to prepare the recipe.',
  })
  instructions: {
    stepNumber: number;
    description: string;
  }[];
  @ApiProperty({
    description: 'Categories associated with this recipe.',
    example: [
      { id: 1, name: 'Vegetarisch' },
      { id: 2, name: 'Italiaans' },
    ],
  })
  categories: {
    id: number;
    name: string;
  }[]; // voor later filter; id nodig?
  //rating: xx
  @ApiProperty({
    description:
      'Aggregated rating info: average rating and the total number of ratings.',
    example: {
      average: 4.3,
      count: 12,
    },
    type: 'integer',
    format: 'int32',
  })
  ratingSummary: {
    average: number | null;
    count: number;
  };
  @ApiProperty({
    example: true,
    description:
      'Indicates whether the current user has marked this recipe as a favorite.',
  })
  isFavorite: boolean;
}

// REQUESTS
export class CreateRecipeRequestDto {
  @IsString({ name: 'name', maxLength: 255 })
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString({ name: 'description', maxLength: 1000, nullable: true })
  description?: string | null;

  @IsOptional()
  @IsString({ name: 'imageUrl', maxLength: 255, nullable: true })
  imageUrl?: string | null;

  @IsNumber({ name: 'time', min: 0, type: 'integer', format: 'int32' })
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
  @Type(() => InstructionDto)
  instructions: InstructionDto[];

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({
    name: 'categories',
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  categories: number[];
}

export class UpdateRecipeRequestDto extends CreateRecipeRequestDto {}
