import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { condos } from './condos';
import { timestamps } from './enums';

export const usersToCondos = pgTable('users_to_condos', {
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  condoId: uuid('condo_id')
    .notNull()
    .references(() => condos.id, { onDelete: 'cascade' }),
  ...timestamps,
});
