import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { instructions } from '../../src/drizzle/schema';

export const INSTRUCTIONS_SEED = [
  { id: 1, recipeId: 1, stepNumber: 1, description: 'Kook de pasta.' },
  { id: 2, recipeId: 1, stepNumber: 2, description: 'Bak de saus.' },

  { id: 3, recipeId: 2, stepNumber: 1, description: 'Snijd de groenten.' },
  { id: 4, recipeId: 2, stepNumber: 2, description: 'Stoof de curry.' },
];

export async function seedInstructions(drizzle: DatabaseProvider) {
  await drizzle.insert(instructions).values(INSTRUCTIONS_SEED);
}

export async function clearInstructions(drizzle: DatabaseProvider) {
  await drizzle.delete(instructions);
}
