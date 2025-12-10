import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { userRecipeRatings } from '../../src/drizzle/schema';

export const RATINGS_SEED = [
  { recipeId: 1, userId: 1, rating: 5 },
  { recipeId: 1, userId: 2, rating: 4 },
  { recipeId: 2, userId: 1, rating: 3 },
];

export async function seedUserRecipeRatings(drizzle: DatabaseProvider) {
  await drizzle.insert(userRecipeRatings).values(RATINGS_SEED);
}

export async function clearUserRecipeRatings(drizzle: DatabaseProvider) {
  await drizzle.delete(userRecipeRatings);
}
