import {
  int,
  mysqlTable,
  varchar,
  uniqueIndex,
  tinyint,
  text,
} from 'drizzle-orm/mysql-core';

export const recipes = mysqlTable('recipes', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }),
  time: int('time'),
  createdBy: int('created_by', { unsigned: true }).notNull(), // foreign sleutel naar users
});

export const ingredients = mysqlTable('ingredients', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
});
