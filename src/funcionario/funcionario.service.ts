import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FuncionarioService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    try {
      return await this.prisma.funcionario.create({
        data: createFuncionarioDto,
      });
    } catch (error) {
      console.error('Erro ao criar funcionario:', error);
      throw new InternalServerErrorException('Não foi possível criar o funcionario.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.funcionario.findMany();
    } catch (error) {
      console.error('Erro ao listar os funcionarios:', error);
      throw new InternalServerErrorException('Não foi possível listar os funcionarios.');
    }
  }

  async findOne(id: number) {
    try {
      const funcionario = await this.prisma.funcionario.findUnique({
        where: { id_funcionario: id }
      });
      if (!funcionario) {
        throw new NotFoundException(`funcionario com ID ${id} não encontrado.`);
      }

      return funcionario;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Erro ao buscar o funcionario ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar o produto.');
    }
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    await this.findOne(id);

    try {
      return await this.prisma.funcionario.update({
        where: { id_funcionario: id },
        data: updateFuncionarioDto,
      });
    } catch (error) {
      console.error(`Erro ao modificar funcionario ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar o funcionario.');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      return await this.prisma.funcionario.delete({
        where: { id_funcionario: id }
      });
    } catch (error) {
      console.error(`Erro ao deletar o funcionario ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar o funcionário');
    }
  }
}
