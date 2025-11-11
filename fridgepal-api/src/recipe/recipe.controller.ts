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
import { RecipeFilterQueryDto } from './recipe.filter-query.dto';
import {
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
  RecipeListResponseDto,
  RecipeDetailResponseDto,
} from './recipe.dto';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { type Session } from '../types/auth';

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

  // TODO routes beschermen voor geauthoriseerde toegang
  // TODO nog niet dringend maar miss wel zorgen dat je paginationQuery kan doen hier
  @Get()
  async getAllRecipes(
    @Query() filters: RecipeFilterQueryDto,
  ): Promise<RecipeListResponseDto> {
    return this.recipeService.getAll(filters);
  }

  // TODO eigen geuploade recepten ophalen?
  @Get(':id')
  async getRecipeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RecipeDetailResponseDto> {
    return this.recipeService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRecipe(
    @CurrentUser() user: Session,
    @Body() createRecipeDto: CreateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    return this.recipeService.create(user.id, createRecipeDto);
  }

  @Put(':id')
  async updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: Session,
    @Body() updateRecipeDto: UpdateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    return this.recipeService.update(id, user.id, user.roles, updateRecipeDto);
  }

  //TODO validatie?
  @Delete(':id')
  async deleteRecipe(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    await this.recipeService.deleteById(id, user.id, user.roles);
  }

  @Get('/:recipeId/isFavorite')
  async isFavorite(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @CurrentUser() user: Session,
  ): Promise<{ isFavorite: boolean }> {
    const isFav = await this.recipeService.isRecipeFavorite(recipeId, user.id);
    return { isFavorite: isFav };
  }

  @Post('/:id/toggleFavorite')
  async toggleFavorite(
    @Param('id', ParseIntPipe) recipeId: number,
    @CurrentUser() user: Session,
  ): Promise<{ isFavorite: boolean }> {
    return this.recipeService.toggleFavorite(recipeId, user.id);
  }
}
