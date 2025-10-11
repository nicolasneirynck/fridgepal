import { Controller, Get } from '@nestjs/common';

@Controller('ingredients')
export class IngredientController {
  @Get()
  getAllIngredients(): string {
    return 'this action returns all ingredients';
  }
}
