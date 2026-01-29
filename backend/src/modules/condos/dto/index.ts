import { IsString, IsOptional, IsEnum, IsUUID, MinLength, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CONDO_STATUS, type CondoStatus } from '@db/schema/enums';
import { ListQueryDto } from '@shared/dto';

const CONDO_SORT_FIELDS = ['name', 'code', 'createdAt', 'updatedAt'] as const;
export type CondoSortBy = (typeof CONDO_SORT_FIELDS)[number];

export class CreateCondoDto {
  @ApiProperty({ example: 'Sunrise Towers' })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @MinLength(1)
  address!: string;

  @ApiProperty({ example: 'SUN-001' })
  @IsString()
  @MinLength(1)
  code!: string;

  @ApiPropertyOptional({ enum: CONDO_STATUS, default: 'ACTIVE' })
  @IsOptional()
  @IsEnum(CONDO_STATUS)
  status?: CondoStatus;
}

export class UpdateCondoDto {
  @ApiPropertyOptional({ example: 'Sunrise Towers' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiPropertyOptional({ example: '123 Main St' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  address?: string;

  @ApiPropertyOptional({ example: 'SUN-001' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  code?: string;

  @ApiPropertyOptional({ enum: CONDO_STATUS })
  @IsOptional()
  @IsEnum(CONDO_STATUS)
  status?: CondoStatus;
}

export class CondoResponseDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  address!: string;

  @ApiProperty()
  @IsString()
  code!: string;

  @ApiPropertyOptional({ enum: CONDO_STATUS })
  @IsOptional()
  @IsEnum(CONDO_STATUS)
  status?: CondoStatus | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class ListCondosQueryDto extends ListQueryDto {
  @ApiPropertyOptional({ enum: CONDO_STATUS, description: 'Filter by status' })
  @IsOptional()
  @IsEnum(CONDO_STATUS)
  status?: CondoStatus;

  @ApiPropertyOptional({ description: 'Search in name, address, code' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: CONDO_SORT_FIELDS, default: 'createdAt' })
  @IsOptional()
  @IsIn(CONDO_SORT_FIELDS)
  sortBy?: CondoSortBy = 'createdAt';
}
