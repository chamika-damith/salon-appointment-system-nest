import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = await this.prisma.service.create({
      data: createServiceDto,
    });
    return service;
  }

  async findAll() {
    return this.prisma.service.findMany();
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    await this.findOne(id); // Check if service exists

    await this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });

    return { message: `Service ${id} updated successfully` };
  }

  async remove(id: string) {
    await this.findOne(id); // Check if service exists

    await this.prisma.service.delete({
      where: { id },
    });

    return { message: `Service ${id} deleted successfully` };
  }
}