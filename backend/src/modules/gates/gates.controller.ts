// src/modules/gates/gates.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GatesService } from './gates.service';
import { CreateGateDto, UpdateGateDto, GateResponseDto } from './dto';

@ApiTags('gates')
@Controller('gates')
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Get()
  @ApiOperation({ summary: 'List all gates' })
  @ApiResponse({ status: 200, description: 'List of gates.', type: [GateResponseDto] })
  async findAll(): Promise<GateResponseDto[]> {
    return this.gatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gate by ID' })
  @ApiParam({ name: 'id', description: 'Gate UUID' })
  @ApiResponse({ status: 200, description: 'Gate found.', type: GateResponseDto })
  @ApiResponse({ status: 404, description: 'Gate not found.' })
  async findOne(@Param('id') id: string): Promise<GateResponseDto> {
    const gate = await this.gatesService.findOne(id);
    if (!gate) throw new NotFoundException(`Gate with id ${id} not found`);
    return gate;
  }

  @Post()
  @ApiOperation({ summary: 'Create a gate' })
  @ApiResponse({ status: 201, description: 'Gate created.', type: GateResponseDto })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async create(@Body() dto: CreateGateDto): Promise<GateResponseDto> {
    return this.gatesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a gate' })
  @ApiParam({ name: 'id', description: 'Gate UUID' })
  @ApiResponse({ status: 200, description: 'Gate updated.', type: GateResponseDto })
  @ApiResponse({ status: 404, description: 'Gate not found.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateGateDto,
  ): Promise<GateResponseDto> {
    const gate = await this.gatesService.update(id, dto);
    if (!gate) throw new NotFoundException(`Gate with id ${id} not found`);
    return gate;
  }
}
