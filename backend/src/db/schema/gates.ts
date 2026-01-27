// src/db/schema/gates.ts
import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

import {
  gateTypeEnum,
  gateMechanismEnum,
  gateStatusEnum,
  timestamps,
} from './enums';

export const gates = pgTable('gates', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  deviceId: text('device_id').notNull(),
  name: text('name').notNull(),
  type: gateTypeEnum().notNull(),
  mechanism: gateMechanismEnum().notNull(),
  status: gateStatusEnum().default('OFFLINE'),
  lastOperationAt: timestamp('last_operation_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  lastOperationStatus: gateStatusEnum(),
  ...timestamps,
});
