import { pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const USER_ROLE = {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
  SADMIN: 'SADMIN',
} as const;
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const GATE_TYPE = {
  VEHICLE_BARRIER: 'VEHICLE_BARRIER',
} as const;
export const GATE_MECHANISM = {
  ONE_ARM_STRAIGHT: 'ONE_ARM_STRAIGHT',
} as const;

export const GATE_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  OFFLINE: 'OFFLINE',
} as const;
export type GateType = (typeof GATE_TYPE)[keyof typeof GATE_TYPE];
export type GateMechanism =
  (typeof GATE_MECHANISM)[keyof typeof GATE_MECHANISM];
export type GateStatus = (typeof GATE_STATUS)[keyof typeof GATE_STATUS];

export const CONDO_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;
export type CondoStatus = (typeof CONDO_STATUS)[keyof typeof CONDO_STATUS];

// pgEnum expects array of strings; use Object.values for portability
export const gateTypeEnum = pgEnum(
  'gate_type',
  Object.values(GATE_TYPE) as [string, ...string[]],
);
export const gateMechanismEnum = pgEnum(
  'gate_mechanism',
  Object.values(GATE_MECHANISM) as [string, ...string[]],
);
export const gateStatusEnum = pgEnum(
  'gate_status',
  Object.values(GATE_STATUS) as [string, ...string[]],
);
export const userRoleEnum = pgEnum(
  'user_role',
  Object.values(USER_ROLE) as [string, ...string[]],
);
export const condoStatusEnum = pgEnum(
  'condo_status',
  Object.values(CONDO_STATUS) as [string, ...string[]],
);

export const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
};
