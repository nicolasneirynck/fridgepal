import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { ingredients } from '../../src/drizzle/schema';

export const INGREDIENTS_SEED = [
  { id: 1, name: 'Spaghetti' },
  { id: 2, name: 'Rundergehakt' },
  { id: 3, name: 'Tomatensaus' },
  { id: 4, name: 'Ui' },
  { id: 5, name: 'Knoflook' },
  { id: 6, name: 'Kikkererwten' },
  { id: 7, name: 'Kokosmelk' },
  { id: 8, name: 'Spinazie' },
  { id: 9, name: 'Currypasta' },
  { id: 10, name: 'Romeinse sla' },
  { id: 11, name: 'Kip' },
  { id: 12, name: 'Parmezaan' },
  { id: 13, name: 'Croutons' },
  { id: 14, name: 'Caesardressing' },
  { id: 15, name: 'Bloem' },
  { id: 16, name: 'Melk' },
  { id: 17, name: 'Ei' },
  { id: 18, name: 'Boter' },
  { id: 19, name: 'Ahornsiroop' },
  { id: 20, name: 'Kidneybonen' },
  { id: 21, name: 'Paprika' },
  { id: 22, name: 'Chilipoeder' },
];

export async function seedIngredients(drizzle: DatabaseProvider) {
  await drizzle.insert(ingredients).values(INGREDIENTS_SEED);
}

export async function clearIngredients(drizzle: DatabaseProvider) {
  await drizzle.delete(ingredients);
}
