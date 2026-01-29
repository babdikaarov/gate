// src/modules/users/users.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { db } from '@db/drizzle';
import { users } from '@db/schema/users';
import { eq } from 'drizzle-orm';
import type { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@Inject('DB') private readonly database: typeof db) {}

  async findAll(): Promise<(typeof users.$inferSelect)[]> {
    return this.database.select().from(users);
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
