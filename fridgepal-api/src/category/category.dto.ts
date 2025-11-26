import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'nestjs-swagger-dto';

export class CategoryResponseDto {
  @ApiProperty({
    example: 3,
    description: 'ID of the category.',
  })
  id: number;

  @ApiProperty({
    example: 'Vegetarisch',
    description: 'Name of the category.',
  })
  name: string;
}

export class CategoryListResponseDto {
  @ApiProperty({
    type: () => [CategoryResponseDto],
    description: 'List of categories.',
  })
  items: CategoryResponseDto[];
}

export class CreateCategoryRequestDto {
  @IsString({ maxLength: 255 })
  name: string;
}
