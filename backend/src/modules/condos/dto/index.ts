import { IsString, IsOptional, IsEnum, IsUUID, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CONDO_STATUS, type CondoStatus } from '@db/schema/enums';

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
