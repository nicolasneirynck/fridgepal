import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { userFavoriteRecipes } from '../../src/drizzle/schema';

export const FAVORITES_SEED = [
  { recipeId: 1, userId: 1, notes: 'Lekker recept!' },
];

export async function seedUserFavoriteRecipes(drizzle: DatabaseProvider) {
  await drizzle.insert(userFavoriteRecipes).values(FAVORITES_SEED);
}

export async function clearUserFavoriteRecipes(drizzle: DatabaseProvider) {
  await drizzle.delete(userFavoriteRecipes);
}
