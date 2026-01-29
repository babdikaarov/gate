import { IsOptional, IsInt, Min, Max, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

const SORT_ORDER = ['asc', 'desc'] as const;
export type SortOrder = (typeof SORT_ORDER)[number];

export class PaginationQueryDto {
  @ApiPropertyOptional({ default: 1, minimum: 1, description: 'Page number (1-based)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100, description: 'Items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export class SortQueryDto {
  @ApiPropertyOptional({ enum: SORT_ORDER, default: 'desc', description: 'Sort direction' })
  @IsOptional()
  @IsIn(SORT_ORDER)
  sortOrder?: SortOrder = 'desc';
}

/** Combined pagination + sort base for list endpoints. Extend and add sortBy enum per module. */
export class ListQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: SORT_ORDER, default: 'desc' })
  @IsOptional()
  @IsIn(SORT_ORDER)
  sortOrder?: SortOrder = 'desc';
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export function paginationMeta(total: number, page: number, limit: number): PaginationMeta {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}
