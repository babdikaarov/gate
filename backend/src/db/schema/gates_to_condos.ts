// src/db/schema/gates.ts
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { condos } from './condos';
import { timestamps } from './enums';

export const gatesToCondos = pgTable('gates_to_condos', {
  gateId: uuid('gate_id')
    .notNull()
    .references(() => condos.id, { onDelete: 'cascade' }),
  condoId: uuid('condo_id')
    .notNull()
    .references(() => condos.id, { onDelete: 'cascade' }),
  ...timestamps,
});
