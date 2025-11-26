import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'nestjs-swagger-dto';

export class IngredientResponseDto {
  @ApiProperty({ example: 4, description: 'ID of ingredient.' })
  id: number;
  @ApiProperty({ example: 'Pasta', description: 'Name of ingredient.' })
  name: string;
}

export class IngredientListResponseDto {
  @ApiProperty({
    type: () => [IngredientResponseDto],
    description: 'List of ingredients returned by the API.',
  })
  items: IngredientResponseDto[];
}

export class CreateIngredientRequestDto {
  @IsString({ maxLength: 255 })
  name: string;
}
