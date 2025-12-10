import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { categories } from '../../src/drizzle/schema';

export const CATEGORIES_SEED = [
  { id: 1, name: 'Italiaans' },
  { id: 2, name: 'Hoofdgerecht' },
  { id: 3, name: 'Aziatisch' },
  { id: 4, name: 'Vegetarisch' },
  { id: 5, name: 'Salade' },
  { id: 6, name: 'Lunch' },
  { id: 7, name: 'Ontbijt' },
  { id: 8, name: 'Dessert' },
  { id: 9, name: 'Mexicaans' },
];

export async function seedCategories(drizzle: DatabaseProvider) {
  await drizzle.insert(categories).values(CATEGORIES_SEED);
}

export async function clearCategories(drizzle: DatabaseProvider) {
  await drizzle.delete(categories);
}
