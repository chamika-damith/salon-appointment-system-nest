import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['admin', 'user'] })
  role: 'admin' | 'user';
}