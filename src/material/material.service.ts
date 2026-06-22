import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMaterialDto: CreateMaterialDto) {
    try {
      return await this.prisma.material.create({
        data: createMaterialDto,
      });
    } catch (error) {
      console.error('Erro ao criar material:', error);
      throw new InternalServerErrorException('Não foi possível criar o material.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.material.findMany();
    } catch (error) {
      console.error('Erro ao listar materiais:', error);
      throw new InternalServerErrorException('Não foi possível listar os materiais.');
    }
  }

  async findOne(id: number) {
    try {
      const material = await this.prisma.material.findUnique({
        where: { id_material: id }
      });
      if (!material) {
        throw new NotFoundException(`O material com ID ${id} não foi encontrado.`);
      }

      return material;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Erro ao buscar o material ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar o material.');
    }
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    await this.findOne(id);

    try {
      return await this.prisma.material.update({
        where: { id_material: id },
        data: updateMaterialDto,
      });
    } catch (error) {
      console.error(`Erro ao modificar material ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar o material.');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.material.delete({
        where: { id_material: id }
      });
    } catch (error) {
      // Impede a deleção se houver histórico de movimentação no estoque
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new BadRequestException('Não é possível deletar este material pois existem registros de movimentação de estoque atrelados a ele.');
      }

      console.error(`Erro ao deletar material ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar o material.');
    }
  }
}