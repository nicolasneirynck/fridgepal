import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { recipeCategories } from '../../src/drizzle/schema';

export const RECIPE_CATEGORIES_SEED = [
  { recipeId: 1, categoryId: 1 },
  { recipeId: 1, categoryId: 2 },
  { recipeId: 2, categoryId: 3 },
  { recipeId: 2, categoryId: 4 },
];

export async function seedRecipeCategories(drizzle: DatabaseProvider) {
  await drizzle.insert(recipeCategories).values(RECIPE_CATEGORIES_SEED);
}

export async function clearRecipeCategories(drizzle: DatabaseProvider) {
  await drizzle.delete(recipeCategories);
}
