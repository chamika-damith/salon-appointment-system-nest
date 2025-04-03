import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../customers/entities/customer.entity';
import { Service } from '../../services/entities/service.entity';

export class Appointment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customer: Customer;

  @ApiProperty()
  service: Service;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;

  @ApiProperty({ enum: ['scheduled', 'completed', 'cancelled'] })
  status: 'scheduled' | 'completed' | 'cancelled';
}