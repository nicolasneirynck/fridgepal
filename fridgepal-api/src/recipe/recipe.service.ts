import { Injectable, NotFoundException } from '@nestjs/common';
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
  RecipeDetailResponseDto,
} from './recipe.dto';

@Injectable()
export class RecipeService {
  getAll(): RecipeListResponseDto {
    return { items: RECIPES }; // later uit database
  }

  getById(id: number): RecipeDetailResponseDto {
    const recipe = RECIPES_DETAIL.find((item: RecipeDetail) => item.id === id);

    if (!recipe) {
      throw new NotFoundException('No recipe with this id exists');
    }

    return recipe;
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
      ratings,
      ingredients,
      ratingSummary,
    }: UpdateRecipeRequestDto,
  ): UpdateRecipeRequestDto {
    let existingRecipe = this.getById(id);

    if (existingRecipe) {
      existingRecipe = {
        id: id,
        name,
        description,
        imageUrl,
        time,
        categories,
        createdBy,
        ingredientsDetailed,
        instructions,
        ratings,
        ingredients,
        ratingSummary,
      };
    }
    return existingRecipe;
  }

  deleteById(id: number): void {
    const index = RECIPES_DETAIL.findIndex(
      (item: RecipeDetail) => item.id === id,
    );
    if (index >= 0) {
      RECIPES_DETAIL.splice(index, 1);
      //zolang geen connectie met database zou beter ook RECIPE.splice(xx) doen
    }
  }
}
