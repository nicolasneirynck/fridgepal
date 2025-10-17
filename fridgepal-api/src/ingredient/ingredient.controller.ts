import { Controller, Get, Query } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientListResponseDto } from './ingredient.dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  async getAllIngredients(
    @Query('search') input?: string,
  ): Promise<IngredientListResponseDto> {
    return this.ingredientService.getAll({ input });
  }
}
