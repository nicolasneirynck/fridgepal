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
  ParseIntPipe,
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

  // TODO nog niet dringend maar miss wel zorgen dat je paginationQuery kan doen hier
  @Get()
  getAllRecipes(
    @Query('ingredient') ingredient?: string[],
  ): Promise<RecipeListResponseDto> {
    return this.recipeService.getAll({ ingredient });
  }

  @Get(':id')
  getRecipeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RecipeDetailResponseDto> {
    return this.recipeService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createRecipe(
    @Body() createRecipeDto: CreateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    console.log(createRecipeDto instanceof CreateRecipeRequestDto);
    return this.recipeService.create(createRecipeDto);
  }

  @Put(':id')
  updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    return this.recipeService.update(id, updateRecipeDto);
  }

  //TODO validatie?
  @Delete(':id')
  async deleteRecipe(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.recipeService.deleteById(id);
  }
}
