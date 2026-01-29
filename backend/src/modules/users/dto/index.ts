import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { USER_ROLE, type UserRole } from '@db/schema/enums';

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
