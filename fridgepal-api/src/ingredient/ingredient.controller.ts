import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import {
  IngredientListResponseDto,
  CreateIngredientRequestDto,
  IngredientResponseDto,
} from './ingredient.dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  async getAllIngredients(
    @Query('search') input?: string,
  ): Promise<IngredientListResponseDto> {
    return this.ingredientService.getAll({ input });
  }

  @Post()
  async createIngredient(
    @Body() createIngredientDto: CreateIngredientRequestDto,
  ): Promise<IngredientResponseDto> {
    return await this.ingredientService.create(createIngredientDto);
  }

  // TODO PUT EN DELETE
}
