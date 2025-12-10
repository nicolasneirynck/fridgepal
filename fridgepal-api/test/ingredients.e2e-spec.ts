import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';
import {
  DrizzleAsyncProvider,
  DatabaseProvider,
} from '../src/drizzle/drizzle.provider';
import request from 'supertest';

import { seedUsers, clearUsers } from './seeds/users';
import {
  seedIngredients,
  clearIngredients,
  INGREDIENTS_SEED,
} from './seeds/ingredients';

import testAuthHeader from './helpers/testAuthHeaders';
import { login, loginAdmin } from './helpers/login';

describe('ingredients', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  const url = '/api/ingredients';

  let userAuthToken: string;
  let adminAuthToken: string;

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await clearIngredients(drizzle);
    await clearUsers(drizzle);

    await seedUsers(app, drizzle);
    await seedIngredients(drizzle);

    userAuthToken = await login(app);
    adminAuthToken = await loginAdmin(app);
  });

  afterAll(async () => {
    // await clearIngredients(drizzle);
    // await clearUsers(drizzle);
    await app.close();
  });

  describe('GET /api/ingredients', () => {
    it('should 200 and return all ingredients', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining(
          INGREDIENTS_SEED.map((i) =>
            expect.objectContaining({ id: i.id, name: i.name }),
          ),
        ),
      );
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('POST /api/ingredients', () => {
    it('should 201 and return created ingredient', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({ name: 'Nieuwe Ingredient' })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe('Nieuwe Ingredient');
    });

    it('should 409 when name already exists', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({ name: INGREDIENTS_SEED[0].name })
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(409);
      expect(response.body.message).toBe(
        'An ingredient with this name already exists',
      );
    });

    it('should 400 when missing name', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({})
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('name');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).post(url).send({ name: 'Auth test' }),
    );
  });

  describe('DELETE /api/ingredients/:id', () => {
    it('should 204 and delete ingredient', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/3`)
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 400 for invalid id', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/invalid`)
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'Validation failed (numeric string is expected)',
      );
    });

    it('should 404 for non-existing ingredient', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/99`)
        .auth(adminAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('No ingredient with this id exists');
    });

    testAuthHeader(() => request(app.getHttpServer()).delete(`${url}/1`));
  });
});
