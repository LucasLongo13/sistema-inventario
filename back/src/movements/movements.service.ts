import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';

@Injectable()
export class MovementsService {
  constructor(private prismaService: PrismaService) {}

  async create(createMovementDto: CreateMovementDto) {
    return this.prismaService.movement.create({
      data: createMovementDto,
    });
  }

  async findAll() {
    return this.prismaService.movement.findMany({
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.movement.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMovementDto: UpdateMovementDto) {
    const existingMovement = await this.findOne(id);

    if (!existingMovement) {
      throw new NotFoundException('Movimiento no encontrado');
    }

    return this.prismaService.movement.update({
      where: {
        id,
      },
      data: updateMovementDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.movement.delete({
      where: {
        id,
      },
    });
  }
}
