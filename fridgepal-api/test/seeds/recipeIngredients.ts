import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { recipeIngredients } from '../../src/drizzle/schema';

export const RECIPE_INGREDIENTS_SEED = [
  { id: 1, amount: 200, unit: 'g', recipeId: 1, ingredientId: 1 },
  { id: 2, amount: 150, unit: 'g', recipeId: 1, ingredientId: 2 },
  { id: 3, amount: 200, unit: 'ml', recipeId: 1, ingredientId: 3 },

  { id: 4, amount: 150, unit: 'g', recipeId: 2, ingredientId: 6 },
  { id: 5, amount: 200, unit: 'ml', recipeId: 2, ingredientId: 7 },
];

export async function seedRecipeIngredients(drizzle: DatabaseProvider) {
  await drizzle.insert(recipeIngredients).values(RECIPE_INGREDIENTS_SEED);
}

export async function clearRecipeIngredients(drizzle: DatabaseProvider) {
  await drizzle.delete(recipeIngredients);
}
