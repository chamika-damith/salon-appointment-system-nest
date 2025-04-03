import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
import { CustomersService } from '../customers/customers.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private customersService: CustomersService,
    private servicesService: ServicesService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // Verify customer and service exist
    await this.customersService.findOne(createAppointmentDto.customerId);
    await this.servicesService.findOne(createAppointmentDto.serviceId);

    const appointment = await this.prisma.appointment.create({
      data: {
        customer: { connect: { id: createAppointmentDto.customerId } },
        service: { connect: { id: createAppointmentDto.serviceId } },
        date: new Date(createAppointmentDto.date).toISOString(),
        time: createAppointmentDto.time,
        status: createAppointmentDto.status,
      },
      include: {
        customer: true,
        service: true,
      },
    });

    return appointment;
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        customer: true,
        service: true,
      },
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        customer: true,
        service: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    // Verify appointment exists
    await this.findOne(id);

    // Verify customer and service exist
    await this.customersService.findOne(updateAppointmentDto.customerId);
    await this.servicesService.findOne(updateAppointmentDto.serviceId);

    await this.prisma.appointment.update({
      where: { id },
      data: {
        customer: { connect: { id: updateAppointmentDto.customerId } },
        service: { connect: { id: updateAppointmentDto.serviceId } },
        date: new Date(updateAppointmentDto.date).toISOString(),
        time: updateAppointmentDto.time,
        status: updateAppointmentDto.status,
      },
    });

    return { message: `Appointment ${id} updated successfully` };
  }

  async remove(id: string) {
    await this.findOne(id); // Check if appointment exists

    await this.prisma.appointment.delete({
      where: { id },
    });

    return { message: `Appointment ${id} deleted successfully` };
  }
}