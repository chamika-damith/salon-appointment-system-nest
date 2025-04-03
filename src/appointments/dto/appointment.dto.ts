import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class CreateAppointmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({ example: '2025-04-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '14:30' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ enum: AppointmentStatus, default: AppointmentStatus.SCHEDULED })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}

export class UpdateAppointmentDto extends CreateAppointmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}