// src/modules/condos/condos.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { db } from '@db/drizzle';
import { condos } from '@db/schema/condos';
import { and, asc, desc, eq, ilike, or, sql, type SQL } from 'drizzle-orm';
import type { CreateCondoDto, ListCondosQueryDto, UpdateCondoDto } from './dto';
import { paginationMeta, type PaginatedResult } from '@shared/dto';

@Injectable()
export class CondosService {
  constructor(@Inject('DB') private readonly database: typeof db) {}

  async findAll(
    query: ListCondosQueryDto,
  ): Promise<PaginatedResult<(typeof condos.$inferSelect)>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'createdAt';
    const sortOrder = query.sortOrder ?? 'desc';

    const conditions: SQL[] = [];
    if (query.status !== undefined) {
      conditions.push(eq(condos.status, query.status));
    }
    if (query.search?.trim()) {
      const term = `%${query.search.trim()}%`;
      conditions.push(
        or(
          ilike(condos.name, term),
          ilike(condos.address, term),
          ilike(condos.code, term),
        )!,
      );
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const orderByColumn =
      sortBy === 'name'
        ? condos.name
        : sortBy === 'code'
          ? condos.code
          : sortBy === 'updatedAt'
            ? condos.updatedAt
            : condos.createdAt;

    const [data, countResult] = await Promise.all([
      this.database
        .select()
        .from(condos)
        .where(whereClause)
        .orderBy(sortOrder === 'asc' ? asc(orderByColumn) : desc(orderByColumn))
        .limit(limit)
        .offset((page - 1) * limit),
      this.database
        .select({ count: sql<number>`count(*)::int` })
        .from(condos)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;
    return {
      data,
      meta: paginationMeta(total, page, limit),
    };
  }

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
