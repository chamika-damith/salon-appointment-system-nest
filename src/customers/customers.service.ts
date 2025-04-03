import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {

    const { name, email, phone, notes } = createCustomerDto;

    const customer = await this.prisma.customer.create({
      data: {
        name,
        email,
        phone,
        notes,
      },
    });
    return customer;
  }

  async findAll() {
    return this.prisma.customer.findMany();
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id); // Check if customer exists

    const { name, email, phone, notes } = updateCustomerDto;

    await this.prisma.customer.update({
      where: { id },
      data:{
        name, email, phone, notes,
      },
    });

    return { message: `Customer ${id} updated successfully` };
  }

  async remove(id: string) {
    await this.findOne(id); // Check if customer exists

    await this.prisma.customer.delete({
      where: { id },
    });

    return { message: `Customer ${id} deleted successfully` };
  }
}
