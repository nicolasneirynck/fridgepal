import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import {
  recipes,
  ingredients,
  categories,
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

import { eq, inArray, sql, desc, and } from 'drizzle-orm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll({
    ingredient,
    category,
  }: {
    ingredient?: string[];
    category?: string[];
  }): Promise<RecipeListResponseDto> {
    const [ingredientIds, categoryIds] = await Promise.all([
      ingredient?.length
        ? this.getRecipeIdsByIngredient(ingredient)
        : undefined,
      category?.length ? this.getRecipeIdsByCategory(category) : undefined,
    ]);

    let recipeIds: number[] | undefined;

    // duplicate ID's er uit halen
    if (ingredientIds && categoryIds) {
      recipeIds = ingredientIds.filter((id) => categoryIds.includes(id));
    } else {
      recipeIds = ingredientIds ?? categoryIds;
    }

    const results = await this.db.query.recipes.findMany({
      with: {
        recipeIngredients: { with: { ingredient: true } },
        recipeCategories: { with: { category: true } },
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
        firstName: recipe.createdBy.firstName,
        lastName: recipe.createdBy.lastName,
      },
      ingredients: recipe.recipeIngredients.map((ri) => ri.ingredient.name),
      categories: recipe.recipeCategories.map((rc) => rc.category.name),
      //ratingSummary: { average: 0, count: 0 },
    }));

    return { items };
  }

  private async getRecipeIdsByIngredient(names: string[]): Promise<number[]> {
    const rows = await this.db
      .selectDistinct({ recipeId: recipeIngredients.recipeId })
      .from(recipeIngredients)
      .innerJoin(
        ingredients,
        eq(recipeIngredients.ingredientId, ingredients.id),
      )
      .where(inArray(ingredients.name, names));

    return rows.map((r) => r.recipeId);
  }

  private async getRecipeIdsByCategory(names: string[]): Promise<number[]> {
    const rows = await this.db
      .selectDistinct({ recipeId: recipeCategories.recipeId })
      .from(recipeCategories)
      .innerJoin(categories, eq(recipeCategories.categoryId, categories.id))
      .where(inArray(categories.name, names));

    return rows.map((r) => r.recipeId);
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
        firstName: rawRecipe.createdBy.firstName,
        lastName: rawRecipe.createdBy.lastName,
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

  async create(
    userId: number,
    dto: CreateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    const [newRecipe] = await this.db
      .insert(recipes)
      .values({
        name: dto.name,
        description: dto.description,
        imageUrl: dto.imageUrl,
        time: Number(dto.time),
        createdBy: userId,
      })
      .$returningId();

    const recipeId = newRecipe.id;

    await this.db.insert(recipeIngredients).values(
      dto.ingredients.map((ing) => ({
        recipeId,
        ingredientId: ing.id,
        amount: ing.amount ? Number(ing.amount) : null,
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
        recipeId: newRecipe.id,
        categoryId: cat,
      })),
    );

    return this.getById(recipeId);
  }

  async update(
    id: number,
    userId: number,
    roles: string[],
    recipe: UpdateRecipeRequestDto,
  ): Promise<RecipeDetailResponseDto> {
    const isAdmin = roles.includes('ADMIN');

    const whereClause = isAdmin
      ? eq(recipes.id, id)
      : and(eq(recipes.id, id), eq(recipes.createdBy, userId));

    await this.db
      .update(recipes)
      .set({
        name: recipe.name,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        time: Number(recipe.time),
      })
      .where(whereClause);

    // TODO foutmelding als iemand recept probeert te veranderen zonder bevoegdheid?

    // voelt wat omslachtig aan maar vind momenteel geen betere oplossing
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
          categoryId: cat,
        })),
      );

    return this.getById(id);
  }

  // async delete(id: number): Promise<void> {
  //   const [result] = await this.db.delete(recipes).where(eq(recipes.id, id));

  //   if (result.affectedRows === 0) {
  //     throw new NotFoundException('No recipe with this id exists');
  //   }
  // }

  async deleteById(id: number, userId: number, roles: string[]): Promise<void> {
    const isAdmin = roles.includes('ADMIN');

    const existingRecipe = await this.db.query.recipes.findFirst({
      where: eq(recipes.id, id),
    });

    if (!existingRecipe) {
      throw new NotFoundException('No recipe with this id exists');
    }

    if (!isAdmin && existingRecipe.createdBy !== userId) {
      throw new ForbiddenException('You can only delete your own recipes');
    }

    await this.db
      .delete(recipeIngredients)
      .where(eq(recipeIngredients.recipeId, id));
    await this.db.delete(instructions).where(eq(instructions.recipeId, id));
    await this.db
      .delete(recipeCategories)
      .where(eq(recipeCategories.recipeId, id));
    await this.db
      .delete(userFavoriteRecipes)
      .where(eq(userFavoriteRecipes.recipeId, id));
    // eventueel later ook: userRecipeRating

    await this.db.delete(recipes).where(eq(recipes.id, id));
  }

  // async getRecipeIdsByIngredient(ingredient: string[]): Promise<number[]> {
  //   const ingredientsArray = Array.isArray(ingredient) // checken of in array zit. Is pas vanaf 2 ingredienten.
  //     ? ingredient
  //     : [ingredient]; // als er maar 1 ingredient in zit -> in array steken

  //   const results = await this.db
  //     .select({
  //       recipeId: recipes.id,
  //       matchCount: sql<number>`COUNT(${ingredients.id})`,
  //     })
  //     .from(recipes)
  //     .leftJoin(recipeIngredients, eq(recipeIngredients.recipeId, recipes.id))
  //     .leftJoin(ingredients, eq(ingredients.id, recipeIngredients.ingredientId))
  //     .where(inArray(ingredients.name, ingredientsArray)) // WHERE {input,..} IN ingredients.name
  //     .groupBy(recipes.id)
  //     .orderBy(desc(sql`COUNT(${ingredients.id})`));

  //   return results.map((recipe) => recipe.recipeId);
  // }
  // async getRecipeIdsByCategory(category: string[]): Promise<number[]> {  } // LATER

  async isRecipeFavorite(recipeId: number, userId: number): Promise<boolean> {
    const favorite = await this.db.query.userFavoriteRecipes.findFirst({
      where: and(
        eq(userFavoriteRecipes.recipeId, recipeId),
        eq(userFavoriteRecipes.userId, userId),
      ),
    });

    return favorite ? true : false;
  }

  async addFavorite(recipeId: number, userId: number): Promise<void> {
    await this.db.insert(userFavoriteRecipes).values({
      recipeId,
      userId,
    });
  }

  async removeFavorite(recipeId: number, userId: number): Promise<void> {
    await this.db
      .delete(userFavoriteRecipes)
      .where(
        and(
          eq(userFavoriteRecipes.recipeId, recipeId),
          eq(userFavoriteRecipes.userId, userId),
        ),
      );
  }

  async toggleFavorite(
    recipeId: number,
    userId: number,
  ): Promise<{ isFavorite: boolean }> {
    const existing = await this.db.query.userFavoriteRecipes.findFirst({
      where: and(
        eq(userFavoriteRecipes.recipeId, recipeId),
        eq(userFavoriteRecipes.userId, userId),
      ),
    });

    if (existing) {
      await this.removeFavorite(recipeId, userId);
      return { isFavorite: false };
    } else {
      await this.addFavorite(recipeId, userId);
      return { isFavorite: true };
    }
  }

  // TODO beschermen
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
        firstName: fav.recipe.createdBy.firstName,
        lastName: fav.recipe.createdBy.lastName,
      },
      ingredients: fav.recipe.recipeIngredients.map((ri) => ri.ingredient.name),
      categories: fav.recipe.recipeCategories.map((rc) => rc.category.name),
    }));
  }
}
