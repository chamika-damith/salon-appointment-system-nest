import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { CustomersModule } from '../customers/customers.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [CustomersModule, ServicesModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}