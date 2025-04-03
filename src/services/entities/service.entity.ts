import { ApiProperty } from '@nestjs/swagger';

export class Service {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
}