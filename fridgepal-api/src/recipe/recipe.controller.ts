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
  /*TODO ik kan hier voor de query's ook een DTO filter maken
 bv export class RecipeFilterQuery {
  category?: string;
  ingredient?: string;
  search?: string;

  en dan:
  getAllRecipes(@Query() filters: RecipeFilterQuery)
}*/

  @Get()
  getAllRecipes(
    @Query('ingredient') ingredient?: string[],
  ): Promise<RecipeListResponseDto> {
    return this.recipeService.getAll({ ingredient });
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
