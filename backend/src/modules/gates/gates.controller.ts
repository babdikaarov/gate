// src/modules/gates/gates.controller.ts
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { GatesService } from './gates.service';
import { CreateGateDto, UpdateGateDto, GateResponseDto } from './dto';

@Controller('gates')
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Get()
  async findAll(): Promise<GateResponseDto[]> {
    return this.gatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GateResponseDto> {
    return this.gatesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateGateDto): Promise<GateResponseDto> {
    return this.gatesService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateGateDto,
  ): Promise<GateResponseDto> {
    return this.gatesService.update(id, dto);
  }
}
