// src/modules/users/users.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { db } from '@db/drizzle';
import { users } from '@db/schema/users';
import { and, asc, desc, eq, ilike, or, sql, type SQL } from 'drizzle-orm';
import type { CreateUserDto, ListUsersQueryDto, UpdateUserDto } from './dto';
import { paginationMeta, type PaginatedResult } from '@shared/dto';

@Injectable()
export class UsersService {
  constructor(@Inject('DB') private readonly database: typeof db) {}

  async findAll(
    query: ListUsersQueryDto,
  ): Promise<PaginatedResult<(typeof users.$inferSelect)>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'createdAt';
    const sortOrder = query.sortOrder ?? 'desc';

    const conditions: SQL[] = [];
    if (query.role !== undefined) {
      conditions.push(eq(users.role, query.role));
    }
    if (query.search?.trim()) {
      const term = `%${query.search.trim()}%`;
      const searchCondition = or(
        ilike(users.firstName, term),
        ilike(users.lastName, term),
        ilike(users.phoneNumber, term),
      );
      if (searchCondition) conditions.push(searchCondition);
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const orderByColumn =
      sortBy === 'firstName'
        ? users.firstName
        : sortBy === 'lastName'
          ? users.lastName
          : sortBy === 'updatedAt'
            ? users.updatedAt
            : users.createdAt;

    const [data, countResult] = await Promise.all([
      this.database
        .select()
        .from(users)
        .where(whereClause)
        .orderBy(sortOrder === 'asc' ? asc(orderByColumn) : desc(orderByColumn))
        .limit(limit)
        .offset((page - 1) * limit),
      this.database
        .select({ count: sql<number>`count(*)::int` })
        .from(users)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;
    return {
      data,
      meta: paginationMeta(total, page, limit),
    };
  }

  async findById(id: string): Promise<(typeof users.$inferSelect) | undefined> {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return user;
  }

  async create(dto: CreateUserDto) {
    const [inserted] = await this.database
      .insert(users)
      .values({
        firstName: dto.firstName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber,
        role: dto.role,
      })
      .returning();
    return inserted;
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<(typeof users.$inferSelect) | undefined> {
    const [updated] = await this.database
      .update(users)
      .set({
        ...(dto.firstName !== undefined && { firstName: dto.firstName }),
        ...(dto.lastName !== undefined && { lastName: dto.lastName }),
        ...(dto.phoneNumber !== undefined && { phoneNumber: dto.phoneNumber }),
        ...(dto.role !== undefined && { role: dto.role }),
      })
      .where(eq(users.id, id))
      .returning();
    return updated;
  }
}
