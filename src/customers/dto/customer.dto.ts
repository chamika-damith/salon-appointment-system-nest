import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '555-123-4567' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Prefers appointments in the morning' })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateCustomerDto{
  @ApiProperty()
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '555-123-4567' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Prefers appointments in the morning' })
  @IsString()
  @IsOptional()
  notes?: string;
}