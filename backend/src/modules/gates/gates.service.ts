import { Injectable, Inject } from '@nestjs/common';
import { db } from '@db/drizzle';
import { gates } from '@db/schema/gates';
import { eq } from 'drizzle-orm';
import type { CreateGateDto, UpdateGateDto } from './dto';

@Injectable()
export class GatesService {
  constructor(@Inject('DB') private readonly database: typeof db) {}

  async findAll(): Promise<(typeof gates.$inferSelect)[]> {
    return this.database.select().from(gates);
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
