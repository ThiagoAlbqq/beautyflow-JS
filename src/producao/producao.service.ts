import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProducaoDto } from './dto/create-producao.dto';
import { UpdateProducaoDto } from './dto/update-producao.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProducaoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProducaoDto: CreateProducaoDto) {
    try {
      return await this.prisma.producao.create({
        data: createProducaoDto,
      });
    } catch (error) {
      console.error('Erro ao criar producao:', error);
      throw new InternalServerErrorException('Não foi possível criar o producao.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.producao.findMany();
    } catch (error) {
      console.error('Erro ao listar producaos:', error);
      throw new InternalServerErrorException('Não foi possível listar os producaos.');
    }
  }

  async findOne(id: number) {
    try {
      const producao = await this.prisma.producao.findUnique({
        where: { id_producao: id }
      });
      if (!producao) {
        throw new NotFoundException(`A producao com ID ${id} não encontrado.`);
      }

      return producao;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Erro ao buscar o producao ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar o producao.');
    }
  }

  async update(id: number, updateProducaoDto: UpdateProducaoDto) {
    await this.findOne(id);

    try {
      return await this.prisma.producao.update({
        where: { id_producao: id },
        data: updateProducaoDto,
      });
    } catch (error) {
      console.error(`Erro ao modificar producao ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar o producao.');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.producao.delete({
        where: { id_producao: id }
      });
    } catch (error) {
      console.error(`Erro ao deletar producao ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar o producao.');
    }
  }
}
