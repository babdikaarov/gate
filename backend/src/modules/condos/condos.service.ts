// src/modules/condos/condos.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { db } from '@db/drizzle';
import { condos } from '@db/schema/condos';
import { eq } from 'drizzle-orm';
import type { CreateCondoDto } from './dto';
import type { UpdateCondoDto } from './dto';

@Injectable()
export class CondosService {
  constructor(@Inject('DB') private readonly database: typeof db) {}

  async create(data: CreateCondoDto) {
    const [inserted] = await this.database
      .insert(condos)
      .values({
        name: data.name,
        address: data.address,
        code: data.code,
        status: data.status,
      })
      .returning();
    return inserted;
  }

  async findAll() {
    return this.database.select().from(condos);
  }

  async findOne(id: string) {
    const [row] = await this.database
      .select()
      .from(condos)
      .where(eq(condos.id, id))
      .limit(1);
    return row;
  }

  async update(id: string, data: UpdateCondoDto) {
    const [updated] = await this.database
      .update(condos)
      .set({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.address !== undefined && { address: data.address }),
        ...(data.code !== undefined && { code: data.code }),
        ...(data.status !== undefined && { status: data.status }),
      })
      .where(eq(condos.id, id))
      .returning();
    return updated;
  }
}
