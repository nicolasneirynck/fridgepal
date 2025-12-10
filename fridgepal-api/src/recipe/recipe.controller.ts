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
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
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
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('recipes')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all recipes',
    type: RecipeListResponseDto,
  })
  @Get()
  async getAllRecipes(
    @Query() filters: RecipeFilterQueryDto,
  ): Promise<RecipeListResponseDto> {
    return this.recipeService.getAll(filters);
  }

  // TODO MISS DEZE ONNODIG? -> al endpoint in users
  @ApiResponse({
    status: 200,
    description: 'Get all favorite recipes of user',
    type: RecipeListResponseDto,
  })
  @Get('favorites')
  async getFavoriteRecipes(
    @CurrentUser() user: Session,
  ): Promise<RecipeListResponseDto> {
    return this.recipeService.getFavorites(user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get recipes by id',
    type: RecipeDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found',
  })
  @Get(':id')
  async getRecipeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RecipeDetailResponseDto> {
    return this.recipeService.getById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create recipe',
    type: RecipeDetailResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRecipe(
    @CurrentUser() user: Session,
    @Body() createRecipeDto: CreateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    return this.recipeService.create(user.id, createRecipeDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Edit recipe',
    type: RecipeDetailResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Put(':id')
  async updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: Session,
    @Body() updateRecipeDto: UpdateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    return this.recipeService.update(id, user.id, user.roles, updateRecipeDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Recipe successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found',
  })
  @Delete(':id')
  @HttpCode(204)
  async deleteRecipe(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    await this.recipeService.deleteById(id, user.id, user.roles);
  }

  @ApiResponse({
    status: 200,
    description: 'Is recipe with this id a favorite of current user?',
    type: RecipeListResponseDto,
    isArray: true,
  })
  @Get('/:id/favorite')
  async isFavorite(
    @Param('id', ParseIntPipe) recipeId: number,
    @CurrentUser() user: Session,
  ): Promise<{ isFavorite: boolean }> {
    const isFav = await this.recipeService.isRecipeFavorite(recipeId, user.id);
    return { isFavorite: isFav };
  }

  @ApiResponse({
    status: 201,
    description: 'Add recipe to user favorites',
    schema: {
      type: 'object',
      properties: {
        isFavorite: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Post('/:id/favorite')
  async toggleFavorite(
    @Param('id', ParseIntPipe) recipeId: number,
    @CurrentUser() user: Session,
  ): Promise<{ isFavorite: boolean }> {
    return this.recipeService.toggleFavorite(recipeId, user.id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 3 * 1024 * 1024 },
    }),
  )
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: Session,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.recipeService.uploadImage(id, file, user);
  }
}
