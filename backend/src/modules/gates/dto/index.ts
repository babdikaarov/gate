import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  MinLength,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  GATE_TYPE,
  GATE_MECHANISM,
  GATE_STATUS,
  type GateType,
  type GateMechanism,
  type GateStatus,
} from '@db/schema/enums';
import { ListQueryDto } from '@shared/dto';

const GATE_SORT_FIELDS = ['name', 'deviceId', 'createdAt', 'updatedAt'] as const;
export type GateSortBy = (typeof GATE_SORT_FIELDS)[number];

export class CreateGateDto {
  @ApiProperty({ example: 'gate-device-001' })
  @IsString()
  @MinLength(1)
  deviceId!: string;

  @ApiProperty({ example: 'Main entrance gate' })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({ enum: GATE_TYPE })
  @IsEnum(GATE_TYPE)
  type!: GateType;

  @ApiProperty({ enum: GATE_MECHANISM })
  @IsEnum(GATE_MECHANISM)
  mechanism!: GateMechanism;

  @ApiPropertyOptional({ enum: GATE_STATUS, default: 'OFFLINE' })
  @IsOptional()
  @IsEnum(GATE_STATUS)
  status?: GateStatus;
}

export class UpdateGateDto {
  @ApiPropertyOptional({ example: 'gate-device-001' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  deviceId?: string;

  @ApiPropertyOptional({ example: 'Main entrance gate' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiPropertyOptional({ enum: GATE_TYPE })
  @IsOptional()
  @IsEnum(GATE_TYPE)
  type?: GateType;

  @ApiPropertyOptional({ enum: GATE_MECHANISM })
  @IsOptional()
  @IsEnum(GATE_MECHANISM)
  mechanism?: GateMechanism;

  @ApiPropertyOptional({ enum: GATE_STATUS })
  @IsOptional()
  @IsEnum(GATE_STATUS)
  status?: GateStatus;
}

/** Response shape for gate entities (enum fields come as string from DB). */
export class GateResponseDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString()
  deviceId!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ enum: GATE_TYPE })
  @IsString()
  type!: string;

  @ApiProperty({ enum: GATE_MECHANISM })
  @IsString()
  mechanism!: string;

  @ApiPropertyOptional({ enum: GATE_STATUS })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty()
  lastOperationAt!: Date;

  @ApiPropertyOptional({ enum: GATE_STATUS })
  @IsOptional()
  @IsString()
  lastOperationStatus?: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class ListGatesQueryDto extends ListQueryDto {
  @ApiPropertyOptional({ enum: GATE_TYPE, description: 'Filter by type' })
  @IsOptional()
  @IsEnum(GATE_TYPE)
  type?: GateType;

  @ApiPropertyOptional({ enum: GATE_MECHANISM, description: 'Filter by mechanism' })
  @IsOptional()
  @IsEnum(GATE_MECHANISM)
  mechanism?: GateMechanism;

  @ApiPropertyOptional({ enum: GATE_STATUS, description: 'Filter by status' })
  @IsOptional()
  @IsEnum(GATE_STATUS)
  status?: GateStatus;

  @ApiPropertyOptional({ description: 'Search in name, deviceId' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: GATE_SORT_FIELDS, default: 'createdAt' })
  @IsOptional()
  @IsIn(GATE_SORT_FIELDS)
  sortBy?: GateSortBy = 'createdAt';
}
