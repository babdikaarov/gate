// src/modules/condos/condos.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { db } from '@db/drizzle';
import { condos } from '@db/schema/condos';

@Injectable()
export class CondosService {
  constructor() {}

  async create(data: any) {
    return db.insert(condos).values(data).returning();
  }

  async findAll() {
    return db.select().from(condos);
  }

  async findOne(id: string) {
    return db.select().from(condos).where(condos.id.eq(id)).get();
  }

  async update(id: string, data: any) {
    return db.update(condos).set(data).where(condos.id.eq(id)).returning();
  }
}
