// src/modules/condos/condos.controller.ts
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CondosService } from './condos.service';

@Controller('condos')
export class CondosController {
  constructor(private readonly condosService: CondosService) {}

  @Get()
  findAll() {
    return this.condosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condosService.findOne(id);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.condosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.condosService.update(id, body);
  }
}
