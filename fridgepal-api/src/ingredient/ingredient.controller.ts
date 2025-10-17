import { Controller, Get } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientListResponseDto } from './ingredient.dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  async getAllIngredients(): Promise<IngredientListResponseDto> {
    return this.ingredientService.getAll();
  }
}
