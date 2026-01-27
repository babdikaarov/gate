// src/db/schema/condos.ts
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from './enums';
import { users } from './users';
import { condos } from './condos';

export const condosToUser = pgTable('condos_to_user', {
  condoId: uuid('condo_id')
    .notNull()
    .references(() => condos.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps,
});
