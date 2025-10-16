import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function resetDatabase() {
  console.log('🗑️ Resetting database...');

  await db.delete(schema.recipes);

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

async function main() {
  console.log('🌱 Starting database seeding...\n');

  await resetDatabase();
  await seedRecipes();
  await seedIngredients();

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
