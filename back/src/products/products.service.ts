import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  async findAll() {
    return this.prismaService.product.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException('Producto no encontrado');

    return this.prismaService.product.update({ where: { id }, data: updateProductDto });
  }

  async remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
