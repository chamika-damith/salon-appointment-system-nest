import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Haircut' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @IsPositive()
  duration: number;

  @ApiProperty({ example: 'Basic haircut service' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'haircut.jpg' })
  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateServiceDto extends CreateServiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}