// src/db/schema/condos.ts
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { condoStatusEnum, timestamps } from './enums';
export const condos = pgTable('condos', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  code: text('code').notNull(),
  status: condoStatusEnum().default('ACTIVE'),
  ...timestamps,
});
