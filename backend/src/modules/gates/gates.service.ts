import { Injectable, Inject } from '@nestjs/common';
import { db } from '@db/drizzle';
import { gates } from '@db/schema/gates';
import { and, asc, desc, eq, ilike, or, sql, type SQL } from 'drizzle-orm';
import type { CreateGateDto, ListGatesQueryDto, UpdateGateDto } from './dto';
import { paginationMeta, type PaginatedResult } from '@shared/dto';

@Injectable()
export class GatesService {
  constructor(@Inject('DB') private readonly database: typeof db) {}

  async findAll(
    query: ListGatesQueryDto,
  ): Promise<PaginatedResult<(typeof gates.$inferSelect)>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'createdAt';
    const sortOrder = query.sortOrder ?? 'desc';

    const conditions: SQL[] = [];
    if (query.type !== undefined) conditions.push(eq(gates.type, query.type));
    if (query.mechanism !== undefined) conditions.push(eq(gates.mechanism, query.mechanism));
    if (query.status !== undefined) conditions.push(eq(gates.status, query.status));
    if (query.search?.trim()) {
      const term = `%${query.search.trim()}%`;
      conditions.push(or(ilike(gates.name, term), ilike(gates.deviceId, term))!);
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const orderByColumn =
      sortBy === 'name'
        ? gates.name
        : sortBy === 'deviceId'
          ? gates.deviceId
          : sortBy === 'updatedAt'
            ? gates.updatedAt
            : gates.createdAt;

    const [data, countResult] = await Promise.all([
      this.database
        .select()
        .from(gates)
        .where(whereClause)
        .orderBy(sortOrder === 'asc' ? asc(orderByColumn) : desc(orderByColumn))
        .limit(limit)
        .offset((page - 1) * limit),
      this.database
        .select({ count: sql<number>`count(*)::int` })
        .from(gates)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;
    return {
      data,
      meta: paginationMeta(total, page, limit),
    };
  }

  async findOne(id: string): Promise<(typeof gates.$inferSelect) | undefined> {
    const [row] = await this.database
      .select()
      .from(gates)
      .where(eq(gates.id, id))
      .limit(1);
    return row;
  }

  async create(dto: CreateGateDto): Promise<(typeof gates.$inferSelect)> {
    const [inserted] = await this.database
      .insert(gates)
      .values({
        deviceId: dto.deviceId,
        name: dto.name,
        type: dto.type,
        mechanism: dto.mechanism,
        status: dto.status,
      })
      .returning();
    if (!inserted) throw new Error('Failed to create gate');
    return inserted;
  }

  async update(
    id: string,
    dto: UpdateGateDto,
  ): Promise<(typeof gates.$inferSelect) | undefined> {
    const [updated] = await this.database
      .update(gates)
      .set({
        ...(dto.deviceId !== undefined && { deviceId: dto.deviceId }),
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.type !== undefined && { type: dto.type }),
        ...(dto.mechanism !== undefined && { mechanism: dto.mechanism }),
        ...(dto.status !== undefined && { status: dto.status }),
      })
      .where(eq(gates.id, id))
      .returning();
    return updated;
  }
}
