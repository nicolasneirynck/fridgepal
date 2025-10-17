import {
  int,
  mysqlTable,
  varchar,
  tinyint,
  text,
  timestamp,
  primaryKey,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const recipes = mysqlTable('recipes', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }),
  time: int('time', { unsigned: true }),
  createdBy: int('created_by', { unsigned: true })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const users = mysqlTable('users', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  userName: varchar('userName', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('firstName', { length: 255 }).notNull(),
  lastName: varchar('lastName', { length: 255 }).notNull(),
  country: varchar('country', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
});

export const ingredients = mysqlTable('ingredients', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const recipeIngredients = mysqlTable('recipe_ingredients', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  amount: int('amount', { unsigned: true }),
  unit: varchar('firstName', { length: 255 }),
  recipeId: int('recipe_id', { unsigned: true })
    .references(() => recipes.id, { onDelete: 'cascade' })
    .notNull(),
  ingredientId: int('ingredient_id', { unsigned: true })
    .references(() => ingredients.id, { onDelete: 'cascade' })
    .notNull(),
});

export const instructions = mysqlTable('instructions', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  stepNumber: int('amount', { unsigned: true }).notNull(),
  description: text('description').notNull(),
  recipeId: int('recipe_id', { unsigned: true })
    .references(() => recipes.id, { onDelete: 'cascade' })
    .notNull(),
});

export const categories = mysqlTable('categories', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const recipeCategories = mysqlTable('recipe_categories', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  recipeId: int('recipe_id', { unsigned: true })
    .references(() => recipes.id, { onDelete: 'cascade' })
    .notNull(),
  categoryId: int('category_id', { unsigned: true })
    .references(() => categories.id, { onDelete: 'cascade' })
    .notNull(),
});

export const userRecipeRatings = mysqlTable(
  'user_recipe_ratings',
  {
    rating: int('rating', { unsigned: true }).notNull(),
    recipeId: int('recipe_id', { unsigned: true })
      .references(() => recipes.id, { onDelete: 'cascade' })
      .notNull(),
    userId: int('user_id', { unsigned: true })
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.recipeId, table.userId] })],
);

export const userRecipeLists = mysqlTable('user_recipe_lists', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: int('user_id', { unsigned: true })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  isDefault: tinyint('is_default').default(0).notNull(), // 0 = false, 1 = true
});

export const savedRecipes = mysqlTable('saved_recipes', {
  recipeListId: int('recipe_list_id', { unsigned: true })
    .references(() => userRecipeLists.id, { onDelete: 'cascade' })
    .notNull(),
  recipeId: int('recipe_id', { unsigned: true })
    .references(() => recipes.id, { onDelete: 'cascade' })
    .notNull(),
  notes: text('notes'),
});
