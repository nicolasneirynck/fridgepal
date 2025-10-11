import { Injectable } from '@nestjs/common';
import {
  RECIPES,
  Recipe,
  RECIPES_DETAIL,
  RecipeDetail,
} from '../data/mock_data';
import {
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
  RecipeListResponseDto,
  RecipeShortResponseDto,
  RecipeDetailResponseDto,
} from './recipe.dto';

@Injectable()
export class RecipeService {
  getAll(): RecipeListResponseDto {
    return { items: RECIPES }; // later uit database
  }

  getById(id: number): RecipeDetailResponseDto | undefined {
    return RECIPES_DETAIL.find((item: RecipeDetail) => item.id === id);
  }

  create({
    name,
    description,
    imageUrl,
    time,
    categories,
    createdBy,
    ingredientsDetailed,
    instructions,
  }: CreateRecipeRequestDto): RecipeDetailResponseDto {
    const newRecipe = {
      id: Math.max(...RECIPES.map((item: Recipe) => item.id)) + 1,
      name,
      description,
      imageUrl,
      time,
      createdBy,
      categories,
      ingredients: ingredientsDetailed.map((ing) => ing.name),
      ingredientsDetailed,
      instructions,
      ratings: [],
      ratingSummary: { average: 0, count: 0 },
    };
    RECIPES_DETAIL.push(newRecipe);
    return newRecipe;
  }

  updateById(
    id: number,
    {
      name,
      description,
      imageUrl,
      time,
      categories,
      createdBy,
      ingredientsDetailed,
      instructions,
    }: CreateRecipeRequestDto,
  ): RecipeDetailResponseDto {
    throw new Error('not yet implemented');
  }

  deleteById(id: number): void {
    throw new Error('not yet implemented');
  }
}
