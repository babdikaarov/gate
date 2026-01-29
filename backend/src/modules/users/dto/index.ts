import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  MinLength,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { USER_ROLE, type UserRole } from '@db/schema/enums';
import { ListQueryDto, type SortOrder } from '@shared/dto';

const USER_SORT_FIELDS = ['firstName', 'lastName', 'createdAt', 'updatedAt'] as const;
export type UserSortBy = (typeof USER_SORT_FIELDS)[number];

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @MinLength(1)
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MinLength(1)
  lastName!: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @MinLength(1)
  phoneNumber!: string;

  @ApiPropertyOptional({ enum: USER_ROLE, default: 'CLIENT' })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: UserRole;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  lastName?: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: USER_ROLE })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: UserRole;
}

export class UserResponseDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString()
  firstName!: string;

  @ApiProperty()
  @IsString()
  lastName!: string;

  @ApiProperty()
  @IsString()
  phoneNumber!: string;

  @ApiProperty({ enum: USER_ROLE })
  @IsEnum(USER_ROLE)
  role!: UserRole;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class ListUsersQueryDto extends ListQueryDto {
  @ApiPropertyOptional({ enum: USER_ROLE, description: 'Filter by role' })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: UserRole;

  @ApiPropertyOptional({ description: 'Search in firstName, lastName, phoneNumber' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: USER_SORT_FIELDS, default: 'createdAt' })
  @IsOptional()
  @IsIn(USER_SORT_FIELDS)
  sortBy?: UserSortBy = 'createdAt';
}
