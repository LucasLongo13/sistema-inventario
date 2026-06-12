import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
   constructor(private prismaService: PrismaService) { }
  
    async create(createCategoryDto: CreateCategoryDto) {
      try {
        const name = (createCategoryDto as any).name ?? (createCategoryDto as any).nombre;

        const existingCategory = await this.prismaService.category.findFirst({
          where: {
            name,
          }
        });
  
        if (existingCategory) {
          throw new ConflictException('El categoría con ese nombre ya está en uso');
        }
  
        const data = { ...(createCategoryDto as any) };
        if (data.nombre !== undefined) {
          data.name = data.nombre;
          delete data.nombre;
        }

        return await this.prismaService.category.create({
          data,
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async findAll() {
      try {
        return await this.prismaService.category.findMany({
          orderBy: {
            name: 'asc',
          }
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async findOne(id: number) {
      try {
        return await this.prismaService.category.findUnique({
          where: {
            id,
          }
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
      const category = await this.findOne(id);
  
      try {
        if (!category) {
          throw new NotFoundException('Categoría no encontrada');
        }
  
        // Normalizar nombre (soporta 'name' o 'nombre')
        const name = (updateCategoryDto as any).name ?? (updateCategoryDto as any).nombre;

        const existingCategory = await this.prismaService.category.findFirst({
          where: {
            name,
          }
        });
  
        if (existingCategory && existingCategory.id !== id) {
          throw new ConflictException('El nombre de la categoría ya está en uso');
        }
  
        const data = { ...(updateCategoryDto as any) };
        if (data.nombre !== undefined) {
          data.name = data.nombre;
          delete data.nombre;
        }

        return await this.prismaService.category.update({
          where: {
            id,
          },
          data,
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async remove(id: number) {
      try {
        return await this.prismaService.category.delete({
          where: {
            id,
          }
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
}
