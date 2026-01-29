// src/modules/condos/condos.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CondosService } from './condos.service';
import {
  CreateCondoDto,
  ListCondosQueryDto,
  UpdateCondoDto,
  CondoResponseDto,
} from './dto';

@ApiTags('condos')
@Controller('condos')
export class CondosController {
  constructor(private readonly condosService: CondosService) {}

  @Get()
  @ApiOperation({
    summary: 'List condos',
    description: 'Paginated, filterable (status, search), sortable list.',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of condos.',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/CondoResponseDto' } },
        meta: {
          type: 'object',
          properties: { total: { type: 'number' }, page: { type: 'number' }, limit: { type: 'number' }, totalPages: { type: 'number' } },
        },
      },
    },
  })
  findAll(@Query() query: ListCondosQueryDto) {
    return this.condosService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get condo by ID' })
  @ApiParam({ name: 'id', description: 'Condo UUID' })
  @ApiResponse({ status: 200, description: 'Condo found.', type: CondoResponseDto })
  @ApiResponse({ status: 404, description: 'Condo not found.' })
  findOne(@Param('id') id: string) {
    return this.condosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a condo' })
  @ApiResponse({ status: 201, description: 'Condo created.', type: CondoResponseDto })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  create(@Body() dto: CreateCondoDto) {
    return this.condosService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a condo' })
  @ApiParam({ name: 'id', description: 'Condo UUID' })
  @ApiResponse({ status: 200, description: 'Condo updated.', type: CondoResponseDto })
  @ApiResponse({ status: 404, description: 'Condo not found.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  update(@Param('id') id: string, @Body() dto: UpdateCondoDto) {
    return this.condosService.update(id, dto);
  }
}
