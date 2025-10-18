import { Injectable, NotFoundException } from '@nestjs/common';
import {
  RECIPES,
  Recipe,
  RECIPES_DETAIL,
  RecipeDetail,
} from '../data/mock_data';

import { recipes, ingredients, recipeIngredients } from '../drizzle/schema';

import {
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
  RecipeListResponseDto,
  RecipeShortResponseDto,
  RecipeDetailResponseDto,
} from './recipe.dto';

import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';

import { eq, inArray, sql, desc } from 'drizzle-orm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll({
    ingredient,
  }: {
    ingredient?: string[];
  }): Promise<RecipeListResponseDto> {
    const input = Array.isArray(ingredient) // is ingredient al een array? (meerdere ingredienten)
      ? ingredient // ja ? gebruik maar zoals het is
      : ingredient // nee (1 of 0 ingredienten) -> bestaat er wel een waarde?
        ? [ingredient] // ja -> maak er een array van
        : []; // nee -> lege array

    const matches = await this.db
      .select({
        recipeId: recipes.id,
        matchCount: sql<number>`COUNT(${ingredients.id})`,
      })
      .from(recipes)
      .leftJoin(recipeIngredients, eq(recipeIngredients.recipeId, recipes.id))
      .leftJoin(ingredients, eq(ingredients.id, recipeIngredients.ingredientId))
      .where(inArray(ingredients.name, input))
      .groupBy(recipes.id)
      .orderBy(desc(sql`COUNT(${ingredients.id})`));

    const recipeIds = matches.map((m) => m.recipeId);

    const recipesDb = await this.db.query.recipes.findMany({
      with: {
        recipeIngredients: { with: { ingredient: true } },
        createdBy: true,
      },
      where: inArray(recipes.id, recipeIds),
    });

    const sortedRecipes = recipeIds.map(
      (id) => recipesDb.find((r) => r.id === id)!, // miss niet zo super veilig zo, later eens bekijken
    );

    const items: RecipeShortResponseDto[] = sortedRecipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      time: recipe.time ?? 0,
      createdBy: {
        id: recipe.createdBy.id,
        userName: recipe.createdBy.userName,
      },
      ingredients: recipe.recipeIngredients.map((ri) => ri.ingredient.name),
      categories: [],
      ratingSummary: { average: 0, count: 0 },
    }));

    return { items };
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
