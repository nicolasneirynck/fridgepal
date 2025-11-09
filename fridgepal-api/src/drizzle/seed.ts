import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';
import * as argon2 from 'argon2';
import { Role } from '../auth/roles';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 2,
    memoryCost: 2 ** 16,
  });
}

async function resetDatabase() {
  console.log('🗑️ Resetting database...');

  await db.delete(schema.userRecipeRatings);
  await db.delete(schema.userFavoriteRecipes);
  await db.delete(schema.recipeIngredients);
  await db.delete(schema.recipeCategories);
  await db.delete(schema.instructions);

  await db.delete(schema.recipes);
  await db.delete(schema.ingredients);
  await db.delete(schema.categories);
  await db.delete(schema.users);

  console.log('✅ Database reset completed\n');
}

async function seedRecipes() {
  console.log('📍 Seeding recipes...');

  await db.insert(schema.recipes).values([
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      description:
        'Een klassiek Italiaans gerecht met rijke tomatensaus en rundergehakt. Perfect voor een snelle maar voedzame maaltijd.',
      imageUrl:
        'https://www.flora.com/en-gb/-/media/Project/Upfield/Brands/Flora/Flora-UK-New/Assets/Recipes/Sync-Images/008d0080-e15e-431e-ada0-d962c3cc073b.jpg',
      time: 45,
      createdBy: 2, // userId 2 = chefMario
    },
    {
      id: 2,
      name: 'Vegetarische Curry',
      description:
        'Een romige curry met kikkererwten en kokosmelk, boordevol groenten en smaak. Ideaal voor vegetariërs en liefhebbers van comfort food.',
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/chicken-curry-lead-65a1629b408b0.jpg',
      time: 30,
      createdBy: 1,
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description:
        'Een frisse salade met kip, romaine sla en krokante croutons, afgewerkt met een klassieke Caesar dressing.',
      imageUrl:
        'https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad-recipe-1160x1567.jpg',
      time: 15,
      createdBy: 3,
    },
    {
      id: 4,
      name: 'Pancakes',
      description:
        'Luchtige American-style pancakes, heerlijk met boter en ahornsiroop.',
      imageUrl:
        'https://www.leukerecepten.nl/app/uploads/2021/05/american-pancakes.jpg',
      time: 20,
      createdBy: 2,
    },
    {
      id: 5,
      name: 'Chili con Carne',
      description:
        'Een kruidige Mexicaanse stoofpot met bonen en gehakt, ideaal voor koude dagen.',
      imageUrl:
        'https://www.puurgezond.nl/fileadmin/_processed_/c/b/csm_iStock_000008043661XSmall_9ef1768e21.jpg',
      time: 60,
      createdBy: 1,
    },
  ]);

  console.log('✅ Recipes seeded successfully\n');
}

async function seedIngredients() {
  console.log('📍 Seeding ingredients...');

  await db.insert(schema.ingredients).values([
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
  ]);

  console.log('✅ Ingredients seeded successfully\n');
}

async function seedUsers() {
  console.log('👥 Seeding users...');

  await db.insert(schema.users).values([
    {
      id: 1,
      passwordHash: await hashPassword('12345678'),
      firstName: 'Nicolas',
      lastName: 'Neirynck',
      email: 'nicolas@example.com',
      roles: [Role.ADMIN, Role.USER],
    },
    {
      id: 2,
      passwordHash: await hashPassword('12345678'),
      firstName: 'Mario',
      lastName: 'Rossi',
      email: 'mario@example.com',
      roles: [Role.USER],
    },
    {
      id: 3,
      passwordHash: await hashPassword('12345678'),
      firstName: 'Lucas',
      lastName: 'Jansen',
      email: 'lucas@example.com',
      roles: [Role.USER],
    },
  ]);

  console.log('✅ Users seeded successfully\n');
}

async function seedCategories() {
  console.log('📍 Seeding categories...');

  await db.insert(schema.categories).values([
    { id: 1, name: 'Italiaans' },
    { id: 2, name: 'Hoofdgerecht' },
    { id: 3, name: 'Aziatisch' },
    { id: 4, name: 'Vegetarisch' },
    { id: 5, name: 'Salade' },
    { id: 6, name: 'Lunch' },
    { id: 7, name: 'Ontbijt' },
    { id: 8, name: 'Dessert' },
    { id: 9, name: 'Mexicaans' },
  ]);

  console.log('✅ Categories seeded successfully\n');
}

async function seedRecipeCategories() {
  console.log('📍 Seeding recipeCategories...');

  await db.insert(schema.recipeCategories).values([
    { recipeId: 1, categoryId: 1 }, // Spaghetti - Italiaans
    { recipeId: 1, categoryId: 2 }, // Spaghetti - Hoofdgerecht
    { recipeId: 2, categoryId: 3 }, // Curry - Aziatisch
    { recipeId: 2, categoryId: 4 }, // Curry - Vegetarisch
    { recipeId: 3, categoryId: 5 }, // Caesar Salad - Salade
    { recipeId: 3, categoryId: 6 }, // Caesar Salad - Lunch
    { recipeId: 4, categoryId: 7 }, // Pancakes - Ontbijt
    { recipeId: 4, categoryId: 8 }, // Pancakes - Dessert
    { recipeId: 5, categoryId: 9 }, // Chili - Mexicaans
    { recipeId: 5, categoryId: 2 }, // Chili - Hoofdgerecht
  ]);

  console.log('✅ Recipe categories seeded successfully\n');
}

async function seedRecipeIngredients() {
  console.log('📍 Seeding recipeIngredients...');

  await db.insert(schema.recipeIngredients).values([
    // Spaghetti Bolognese
    { id: 1, amount: 200, unit: 'g', recipeId: 1, ingredientId: 1 },
    { id: 2, amount: 150, unit: 'g', recipeId: 1, ingredientId: 2 },
    { id: 3, amount: 200, unit: 'ml', recipeId: 1, ingredientId: 3 },
    { id: 4, amount: 1, unit: 'stuk', recipeId: 1, ingredientId: 4 },
    { id: 5, amount: 2, unit: 'teentjes', recipeId: 1, ingredientId: 5 },

    // Curry
    { id: 6, amount: 150, unit: 'g', recipeId: 2, ingredientId: 6 },
    { id: 7, amount: 200, unit: 'ml', recipeId: 2, ingredientId: 7 },
    { id: 8, amount: 50, unit: 'g', recipeId: 2, ingredientId: 8 },
    { id: 9, amount: 1, unit: 'stuk', recipeId: 2, ingredientId: 4 },
    { id: 10, amount: 2, unit: 'el', recipeId: 2, ingredientId: 9 },

    // Caesar Salad
    { id: 11, amount: 1, unit: 'krop', recipeId: 3, ingredientId: 10 },
    { id: 12, amount: 100, unit: 'g', recipeId: 3, ingredientId: 11 },
    { id: 13, amount: 50, unit: 'g', recipeId: 3, ingredientId: 12 },
    { id: 14, amount: 30, unit: 'g', recipeId: 3, ingredientId: 13 },
    { id: 15, amount: 2, unit: 'el', recipeId: 3, ingredientId: 14 },
  ]);

  console.log('✅ Recipe ingredients seeded successfully\n');
}

async function seedInstructions() {
  console.log('📍 Seeding instructions...');

  await db.insert(schema.instructions).values([
    // Spaghetti Bolognese
    {
      id: 1,
      stepNumber: 1,
      description: 'Kook de spaghetti beetgaar.',
      recipeId: 1,
    },
    {
      id: 2,
      stepNumber: 2,
      description: 'Bak de ui en knoflook glazig.',
      recipeId: 1,
    },
    {
      id: 3,
      stepNumber: 3,
      description: 'Voeg het gehakt toe en bak rul.',
      recipeId: 1,
    },
    {
      id: 4,
      stepNumber: 4,
      description: 'Roer de tomatensaus erdoor en laat 15 minuten sudderen.',
      recipeId: 1,
    },

    // Pancakes
    {
      id: 5,
      stepNumber: 1,
      description: 'Meng bloem, melk en eieren tot een glad beslag.',
      recipeId: 4,
    },
    {
      id: 6,
      stepNumber: 2,
      description: 'Smelt wat boter in een pan en bak kleine hoopjes beslag.',
      recipeId: 4,
    },
    {
      id: 7,
      stepNumber: 3,
      description: 'Serveer met ahornsiroop.',
      recipeId: 4,
    },
  ]);

  console.log('✅ Instructions seeded successfully\n');
}

async function seedUserRecipeRatings() {
  console.log('📍 Seeding ratings...');

  await db.insert(schema.userRecipeRatings).values([
    { recipeId: 1, userId: 1, rating: 5 },
    { recipeId: 1, userId: 2, rating: 4 },
    { recipeId: 1, userId: 3, rating: 5 },
    { recipeId: 2, userId: 1, rating: 4 },
    { recipeId: 3, userId: 3, rating: 5 },
  ]);

  console.log('✅ Ratings seeded successfully\n');
}

async function main() {
  console.log('🌱 Starting database seeding...\n');

  await resetDatabase();
  await seedUsers();
  await seedRecipes();
  await seedIngredients();
  await seedCategories();
  await seedRecipeCategories();
  await seedRecipeIngredients();
  await seedInstructions();
  await seedUserRecipeRatings();

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .then(async () => {
    await connection.end();
  })
  .catch(async (e) => {
    console.error(e);
    await connection.end();
    process.exit(1);
  });
