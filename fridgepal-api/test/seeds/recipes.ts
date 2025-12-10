import { sql } from 'drizzle-orm';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { recipes } from '../../src/drizzle/schema';

export const RECIPES_SEED = [
  {
    id: 1,
    name: 'Test Recipe 1',
    description: 'Een eenvoudige testrecipe.',
    imageUrl: null,
    time: 15,
    createdBy: 1,
  },
  {
    id: 2,
    name: 'Test Recipe 2',
    description: 'Tweede testrecipe voor testen.',
    imageUrl: null,
    time: 25,
    createdBy: 1,
  },
  {
    id: 3,
    name: 'Test Recipe 3',
    description: 'Derde testrecipe.',
    imageUrl: null,
    time: 30,
    createdBy: 2,
  },
];

export async function seedRecipes(drizzle: DatabaseProvider) {
  await drizzle.insert(recipes).values(RECIPES_SEED);
}

// export async function clearRecipes(drizzle: DatabaseProvider) {
//   await drizzle.delete(recipes);
// }

export async function clearRecipes(drizzle: DatabaseProvider) {
  await drizzle.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);
  await drizzle.execute(sql`TRUNCATE TABLE recipe_ingredients`);
  await drizzle.execute(sql`TRUNCATE TABLE recipe_categories`);
  await drizzle.execute(sql`TRUNCATE TABLE instructions`);
  await drizzle.execute(sql`TRUNCATE TABLE recipes`);
  await drizzle.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);
}
