// src/modules/users/users.controller.ts
import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { users } from '@db/schema/users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  async create(
    @Body()
    dto: Omit<typeof users.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    dto: Omit<typeof users.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return this.usersService.update(id, dto);
  }
}
