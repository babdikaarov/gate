// src/db/schema/users.ts
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { userRoleEnum, timestamps } from './enums';

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  role: userRoleEnum().notNull().default('CLIENT'),
  ...timestamps,
});
