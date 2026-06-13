import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FornecedorService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFornecedorDto: CreateFornecedorDto) {
    try {
      return await this.prisma.fornecedor.create({
        data: createFornecedorDto,
      });
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      throw new InternalServerErrorException('Não foi possível cadastrar o fornecedor.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.fornecedor.findMany();
    } catch (error) {
      console.error('Erro ao listar fornecedores:', error);
      throw new InternalServerErrorException('Não foi possível listar os fornecedores.');
    }
  }

  async findOne(id: number) {
    try {
      const fornecedor = await this.prisma.fornecedor.findUnique({
        where: { id_fornecedor: id }
      });
      if (!fornecedor) {
        throw new NotFoundException(`fornecedor com ID ${id} não encontrado.`);
      }
      return fornecedor;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Erro ao buscar o fornecedor ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar o fornecedor.');
    }
  }

  async update(id: number, updateFornecedorDto: UpdateFornecedorDto) {
    await this.findOne(id);

    try {
      return await this.prisma.fornecedor.update({
        where: { id_fornecedor: id },
        data: updateFornecedorDto,
      });
    } catch (error) {
      console.error(`Erro ao modificar fornecedor ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar o fornecedor.');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.fornecedor.delete({
        where: { id_fornecedor: id }
      });
    } catch (error) {
      console.error(`Erro ao deletar fornecedor ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar o fornecedor.');
    }
  }
}
