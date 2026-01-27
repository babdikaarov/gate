// src/modules/users/users.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { db } from '@db/drizzle'; // optional, if you want direct import
import { users } from '@db/schema/users'; // Drizzle users table
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject('DB') private readonly database: typeof db) {}

  async findAll(): Promise<(typeof users.$inferSelect)[]> {
    return this.database.select().from(users);
  }

  async findById(id: string): Promise<typeof users.$inferSelect | undefined> {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1); // Optimization: tell DB to stop after 1

    return user; // This is now either the User object or undefined
  }

  async create(dto: typeof users.$inferInsert) {
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

  async update(id: string, dto: typeof users.$inferInsert) {
    const [updated] = await this.database
      .update(users)
      .set({ ...dto })
      .where(eq(users.id, id))
      .returning();
    return updated;
  }
}
