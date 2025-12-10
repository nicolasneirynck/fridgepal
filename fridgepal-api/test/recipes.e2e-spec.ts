import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { clearRecipes, RECIPES_SEED, seedRecipes } from './seeds/recipes';
import request from 'supertest';
import { seedUsers, clearUsers } from './seeds/users';
import { login, loginAdmin } from './helpers/login';
import { clearCategories, seedCategories } from './seeds/categories';
import {
  clearRecipeCategories,
  seedRecipeCategories,
} from './seeds/recipeCategories';
import {
  clearRecipeIngredients,
  seedRecipeIngredients,
} from './seeds/recipeIngredients';
import { clearInstructions, seedInstructions } from './seeds/instructions';
import {
  clearUserFavoriteRecipes,
  seedUserFavoriteRecipes,
} from './seeds/userFavoriteRecipes';
import {
  seedUserRecipeRatings,
  clearUserRecipeRatings,
} from './seeds/userRecipeRatings';
import { seedIngredients, clearIngredients } from './seeds/ingredients';
import testAuthHeader from './helpers/testAuthHeaders';

describe('recipes', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  const url = '/api/recipes';
  let userAuthToken: string;
  let adminAuthToken: string;

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    // await seedUsers(app, drizzle);
    // await seedCategories(drizzle);
    // await seedIngredients(drizzle);
    // await seedRecipes(drizzle);
    // await seedRecipeCategories(drizzle);
    // await seedRecipeIngredients(drizzle);
    // await seedInstructions(drizzle);
    // await seedUserFavoriteRecipes(drizzle);
    // await seedUserRecipeRatings(drizzle);
    // userAuthToken = await login(app);
    // adminAuthToken = await loginAdmin(app);
  });

  beforeEach(async () => {
    await clearUserRecipeRatings(drizzle);
    await clearUserFavoriteRecipes(drizzle);
    await clearInstructions(drizzle);
    await clearRecipeIngredients(drizzle);
    await clearRecipeCategories(drizzle);
    await clearRecipes(drizzle);
    await clearIngredients(drizzle);
    await clearCategories(drizzle);
    await clearUsers(drizzle);

    await seedUsers(app, drizzle);
    await seedCategories(drizzle);
    await seedIngredients(drizzle);
    await seedRecipes(drizzle);
    await seedRecipeCategories(drizzle);
    await seedRecipeIngredients(drizzle);
    await seedInstructions(drizzle);
    await seedUserFavoriteRecipes(drizzle);
    await seedUserRecipeRatings(drizzle);

    userAuthToken = await login(app);
    adminAuthToken = await loginAdmin(app);
  });

  afterAll(async () => {
    // await clearUserRecipeRatings(drizzle);
    // await clearUserFavoriteRecipes(drizzle);
    // await clearInstructions(drizzle);
    // await clearRecipeIngredients(drizzle);
    // await clearRecipeCategories(drizzle);
    // await clearRecipes(drizzle);
    // await clearIngredients(drizzle);
    // await clearCategories(drizzle);
    // await clearUsers(drizzle);
    await app.close();
  });

  describe('GET /api/recipes', () => {
    it('should 200 and return all recipes', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });
      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining(
          RECIPES_SEED.map(
            (r) => expect.objectContaining({ id: r.id, name: r.name }), // Zo oplossen want genest object
          ),
        ),
      );
    });
    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/recipes/:id', () => {
    it('should 200 and return the requested recipe', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/1`)
        .auth(userAuthToken, { type: 'bearer' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: RECIPES_SEED[0].id,
        name: RECIPES_SEED[0].name,
        description: RECIPES_SEED[0].description,
        time: RECIPES_SEED[0].time,
      });
      expect(response.body).toHaveProperty('ingredients');
      expect(response.body).toHaveProperty('categories');
      expect(response.body).toHaveProperty('createdBy');
    });

    it('should 404 when the recipe a not existing recipe', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/10`)
        .auth(userAuthToken, { type: 'bearer' });
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('No recipe with this id exists');
    });

    it('should 400 when invalid recipeId', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/invalid`)
        .auth(userAuthToken, { type: 'bearer' });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'Validation failed (numeric string is expected)',
      );
    });
    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1`));
  });

  describe('POST /api/recipes', () => {
    it('should 201 and return the created recipe', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: 'Heerlijke Pannenkoeken',
          description: 'Luchtig en snel klaar.',
          time: 20,
          imageUrl: null,
          categories: [7],
          ingredients: [
            { id: 15, amount: 200, unit: 'g' },
            { id: 16, amount: 250, unit: 'ml' },
            { id: 17, amount: 2, unit: 'stuks' },
          ],
          instructions: [
            { stepNumber: 1, description: 'Meng alles tot een beslag.' },
            { stepNumber: 2, description: 'Bak in een pan.' },
          ],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
    });

    it('should 409 when a recipe with the same name already exists', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: RECIPES_SEED[0].name,
          description: 'Conflict test',
          time: 10,
          categories: [1],
          ingredients: [{ id: 1, amount: 100, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(409);
      expect(response.body).toMatchObject({
        message: 'A recipe with this name already exists',
      });
    });

    it('should 400 when missing name', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          description: 'Missing name',
          time: 10,
          categories: [1],
          ingredients: [{ id: 1, amount: 100, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('name');
    });

    it('should 400 when time is missing', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: 'Incomplete Recipe',
          description: 'Missing time',
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('time');
    });

    it('should 400 when time is negative', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: 'Bad Recipe',
          description: 'wrong time',
          time: -5,
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('time');
    });

    it('should 400 when time is a decimal', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: 'Bad Recipe',
          description: 'decimal time',
          time: 12.5,
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('time');
    });

    it('should 400 when description is missing', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: 'No description recipe',
          time: 10,
          categories: [1],
          ingredients: [{ id: 1, amount: 100, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('description');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).post(url).send({
        name: 'Auth test recipe',
        description: 'Auth',
        time: 15,
      }),
    );
  });

  describe('PUT /api/recipes/:id', () => {
    it('should 200 and return the updated recipe', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          name: 'Aangepast recept',
          description: 'Nieuwe omschrijving',
          time: 25,
          categories: [1],
          ingredients: [{ id: 1, amount: 200, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Stap 1' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 1,
          name: 'Aangepast recept',
          time: 25,
        }),
      );
    });

    it('should 409 when updating to a duplicate recipe name', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/2`)
        .send({
          name: RECIPES_SEED[0].name,
          description: 'Dubbel test',
          time: 20,
          categories: [1],
          ingredients: [{ id: 1, amount: 100, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(409);
      expect(response.body.message).toEqual(
        'A recipe with this name already exists',
      );
    });

    it('should 400 when name is missing', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          description: 'Geen naam',
          time: 20,
          categories: [1],
          ingredients: [{ id: 1, amount: 100, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Stap' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('name');
    });

    it('should 400 when time is negative', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          name: 'Fout recept',
          description: 'tijd fout',
          time: -10,
          categories: [1],
          ingredients: [{ id: 1, amount: 50, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('time');
    });

    it('should 400 when time is a decimal', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          name: 'Fout tijd',
          description: 'decimal',
          time: 12.5,
          categories: [1],
          ingredients: [{ id: 1, amount: 50, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('time');
    });

    it('should 400 when no ingredients are provided', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          name: 'Recept zonder ingredients',
          time: 20,
          categories: [1],
          ingredients: [],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('ingredients');
    });

    it('should 400 when no instructions are provided', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          name: 'Recept zonder stappen',
          time: 20,
          categories: [1],
          ingredients: [{ id: 1, amount: 50, unit: 'g' }],
          instructions: [],
        })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('instructions');
    });

    testAuthHeader(() =>
      request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          name: 'Auth necessary',
          time: 20,
          categories: [1],
          ingredients: [{ id: 1, amount: 50, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        }),
    );
  });

  describe('DELETE /api/recipes/:id', () => {
    it('should 204 and return nothing', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/3`)
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 400 with invalid recipe id', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/invalid`)
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'Validation failed (numeric string is expected)',
      );
    });

    it('should 404 with non-existing recipe', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('No recipe with this id exists');
    });

    testAuthHeader(() => request(app.getHttpServer()).delete(`${url}/1`));
  });

  describe('PUT /api/recipes/:id (unauthorized)', () => {
    it('should 403 when non-owner & non-admin tries to update', async () => {
      const response = await request(app.getHttpServer())
        .put('/api/recipes/3')
        .send({
          name: 'Hacked!',
          description: 'Should not work',
          time: 10,
          categories: [1],
          ingredients: [{ id: 1, amount: 100, unit: 'g' }],
          instructions: [{ stepNumber: 1, description: 'Test' }],
        })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe('Forbidden resource');
    });
  });

  describe('DELETE /api/recipes/:id (unauthorized)', () => {
    it('should 403 when non-owner & non-admin tries to delete', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/recipes/3')
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(403);
    });
  });

  describe('POST /api/recipes/:id/favorite', () => {
    it('should add to favorites when not yet favorited', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/recipes/2/favorite')
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.isFavorite).toBe(true);
    });

    it('should remove from favorites when already favorited', async () => {
      await request(app.getHttpServer())
        .post('/api/recipes/2/favorite')
        .auth(userAuthToken, { type: 'bearer' });

      const response = await request(app.getHttpServer())
        .post('/api/recipes/2/favorite')
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.isFavorite).toBe(false);
    });
  });

  describe('GET /api/recipes?search=', () => {
    it('should filter by name substring', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/recipes?search=Test Recipe 1')
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0].name).toBe('Test Recipe 1');
    });
  });

  it('should 400 when categories array is empty', async () => {
    const response = await request(app.getHttpServer())
      .put('/api/recipes/1')
      .send({
        name: 'No cats',
        description: 'test',
        time: 20,
        categories: [],
        ingredients: [{ id: 1, amount: 20, unit: 'g' }],
        instructions: [{ stepNumber: 1, description: 'step' }],
      })
      .auth(adminAuthToken, { type: 'bearer' });

    expect(response.statusCode).toBe(400);
  });

  it('should 400 when no file uploaded', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/recipes/1/upload-image')
      .auth(adminAuthToken, { type: 'bearer' });

    expect(response.statusCode).toBe(400);
  });
});
