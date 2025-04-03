import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class Customer {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  notes: string;
}
