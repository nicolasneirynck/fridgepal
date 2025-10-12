import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

import { PaginationQuery } from '../common/common.dto';
import { RecipeService } from './recipe.service';

import {
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
  RecipeListResponseDto,
  RecipeDetailResponseDto,
} from './recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /*  @Get()
  getAllRecipes(@Query() paginationQuery: PaginationQuery): string {
    const { page = 1, limit = 10 } = paginationQuery;
    return `This action returns all recipes. Limit ${limit}, page: ${page}`;
  } */
  @Get()
  getAllRecipes(): RecipeListResponseDto {
    return this.recipeService.getAll();
  }

  @Get(':id')
  getRecipeById(@Param('id') id: string): RecipeDetailResponseDto {
    return this.recipeService.getById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createRecipe(
    @Body() createRecipeDto: CreateRecipeRequestDto,
  ): RecipeDetailResponseDto {
    return this.recipeService.create(createRecipeDto);
  }

  @Put(':id')
  updateRecipe(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeRequestDto,
  ): RecipeDetailResponseDto {
    return this.recipeService.updateById(Number(id), updateRecipeDto);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: void) {
    this.recipeService.deleteById(Number(id));
  }
}
