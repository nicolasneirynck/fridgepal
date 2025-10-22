import { Injectable, NotFoundException } from '@nestjs/common';

import {
  recipes,
  ingredients,
  recipeIngredients,
  instructions,
  recipeCategories,
  userFavoriteRecipes,
} from '../drizzle/schema';

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
    let recipeIds: number[] | undefined;

    if (ingredient) {
      recipeIds = await this.getRecipeIdsByIngredient(ingredient);
    }

    // ALS IK NOG TIJD HEB: later hier bv categorie filter -> vergeet niet dan te checken of dubbele ID's he

    const results = await this.db.query.recipes.findMany({
      with: {
        recipeIngredients: { with: { ingredient: true } },
        createdBy: true,
      },
      where: recipeIds ? inArray(recipes.id, recipeIds) : undefined,
    });

    const items: RecipeShortResponseDto[] = results.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      time: recipe.time,
      createdBy: {
        id: recipe.createdBy.id,
        userName: recipe.createdBy.userName,
      },
      ingredients: recipe.recipeIngredients.map((ri) => ri.ingredient.name),
      categories: [],
      //ratingSummary: { average: 0, count: 0 },
    }));

    return { items };
  }

  async getById(id: number): Promise<RecipeDetailResponseDto> {
    const rawRecipe = await this.db.query.recipes.findFirst({
      where: eq(recipes.id, id),
      with: {
        recipeCategories: { with: { category: true } },
        recipeIngredients: { with: { ingredient: true } },
        instructions: true,
        userRecipeRating: { with: { user: true } },
        userFavoriteRecipes: true,
        createdBy: true,
      },
    });

    if (!rawRecipe) {
      throw new NotFoundException('No recipe with this id exists');
    }

    const recipe: RecipeDetailResponseDto = {
      // omzetten om frontend makkelijker te maken
      id: rawRecipe.id,
      name: rawRecipe.name,
      description: rawRecipe.description,
      imageUrl: rawRecipe.imageUrl,
      time: rawRecipe.time,
      createdBy: {
        id: rawRecipe.createdBy.id,
        userName: rawRecipe.createdBy.userName,
      },
      createdAt: rawRecipe.createdAt,
      ingredients: rawRecipe.recipeIngredients.map((ri) => ({
        // moest ik deze vaker nog gebruiken kan ik hulpmethode maken voor leesbaarheid
        name: ri.ingredient.name,
        amount: ri.amount!,
        unit: ri.unit!,
      })),
      instructions: rawRecipe.instructions,
      categories: rawRecipe.recipeCategories.map((rc) => ({
        id: rc.categoryId,
        name: rc.category.name,
      })),
      //    ratings:  -> voor later, want eerst moet alles rond users en inloggen geregeld worden
      // ratingSummary: {
      //   average:
      //     recipe.userRecipeRating.length > 0
      //       ? recipe.userRecipeRating.reduce((sum, r) => sum + r.rating, 0) /
      //         recipe.userRecipeRating.length
      //       : null,
      //   count: recipe.userRecipeRating.length,
      // },
    };

    return recipe;
  }

  async create(dto: CreateRecipeRequestDto): Promise<RecipeDetailResponseDto> {
    const [newRecipe] = await this.db
      .insert(recipes)
      .values({
        name: dto.name,
        description: dto.description,
        imageUrl: dto.imageUrl,
        time: dto.time,
        createdBy: dto.createdBy.id,
      })
      .$returningId();

    const recipeId = newRecipe.id;

    await this.db.insert(recipeIngredients).values(
      dto.ingredients.map((ing) => ({
        recipeId,
        ingredientId: ing.id,
        amount: ing.amount,
        unit: ing.unit,
      })),
    );

    await this.db.insert(instructions).values(
      dto.instructions.map((inst) => ({
        recipeId,
        stepNumber: inst.stepNumber,
        description: inst.description,
      })),
    );

    await this.db.insert(recipeCategories).values(
      dto.categories.map((cat) => ({
        recipeId,
        categoryId: cat.id,
      })),
    );

    return this.getById(recipeId);
  }

  async update(
    id: number,
    recipe: UpdateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    await this.db
      .update(recipes)
      .set({
        name: recipe.name,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        time: recipe.time,
      })
      .where(eq(recipes.id, id));

    // voelt wat omslachtig aan maar vindt momenteel geen betere oplossing
    await this.db
      .delete(recipeIngredients)
      .where(eq(recipeIngredients.recipeId, id));
    await this.db.delete(instructions).where(eq(instructions.recipeId, id));
    await this.db
      .delete(recipeCategories)
      .where(eq(recipeCategories.recipeId, id));

    if (recipe.ingredients.length)
      await this.db.insert(recipeIngredients).values(
        recipe.ingredients.map((ing) => ({
          recipeId: id,
          ingredientId: ing.id,
          amount: ing.amount,
          unit: ing.unit,
        })),
      );

    if (recipe.instructions.length)
      await this.db.insert(instructions).values(
        recipe.instructions.map((inst) => ({
          recipeId: id,
          stepNumber: inst.stepNumber,
          description: inst.description,
        })),
      );

    if (recipe.categories.length)
      await this.db.insert(recipeCategories).values(
        recipe.categories.map((cat) => ({
          recipeId: id,
          categoryId: cat.id,
        })),
      );

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const [result] = await this.db.delete(recipes).where(eq(recipes.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('No place with this id exists');
    }
  }

  // deleteById(id: number): void {
  //   const index = RECIPES_DETAIL.findIndex(
  //     (item: RecipeDetail) => item.id === id,
  //   );
  //   if (index >= 0) {
  //     RECIPES_DETAIL.splice(index, 1);
  //     //zolang geen connectie met database zou beter ook RECIPE.splice(xx) doen
  //   }
  // }

  async getRecipeIdsByIngredient(ingredient: string[]): Promise<number[]> {
    const ingredientsArray = Array.isArray(ingredient) // checken of in array zit. Is pas vanaf 2 ingredienten.
      ? ingredient
      : [ingredient]; // als er maar 1 ingredient in zit -> in array steken

    const results = await this.db
      .select({
        recipeId: recipes.id,
        matchCount: sql<number>`COUNT(${ingredients.id})`,
      })
      .from(recipes)
      .leftJoin(recipeIngredients, eq(recipeIngredients.recipeId, recipes.id))
      .leftJoin(ingredients, eq(ingredients.id, recipeIngredients.ingredientId))
      .where(inArray(ingredients.name, ingredientsArray)) // WHERE {input,..} IN ingredients.name
      .groupBy(recipes.id)
      .orderBy(desc(sql`COUNT(${ingredients.id})`));

    return results.map((recipe) => recipe.recipeId);
  }
  // async getRecipeIdsByCategory(category: string[]): Promise<number[]> {  } // LATER

  async getFavoriteRecipesByUserId(
    userId: number,
  ): Promise<RecipeShortResponseDto[]> {
    const favoriteRecipes = await this.db.query.userFavoriteRecipes.findMany({
      where: eq(userFavoriteRecipes.userId, userId),
      with: {
        recipe: {
          with: {
            recipeIngredients: { with: { ingredient: true } },
            recipeCategories: { with: { category: true } },
            createdBy: true,
          },
        },
      },
    });

    return favoriteRecipes.map((fav) => ({
      id: fav.recipe.id,
      name: fav.recipe.name,
      description: fav.recipe.description,
      imageUrl: fav.recipe.imageUrl,
      time: fav.recipe.time,
      createdBy: {
        id: fav.recipe.createdBy.id,
        userName: fav.recipe.createdBy.userName,
      },
      ingredients: fav.recipe.recipeIngredients.map((ri) => ri.ingredient.name),
      categories: fav.recipe.recipeCategories.map((rc) => ({
        id: rc.category.id,
        name: rc.category.name,
      })),
    }));
  }
}
