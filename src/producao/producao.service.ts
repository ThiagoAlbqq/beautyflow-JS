import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProducaoDto } from './dto/create-producao.dto';
import { UpdateProducaoDto } from './dto/update-producao.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProducaoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProducaoDto: CreateProducaoDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const novaProducao = await tx.producao.create({
          data: createProducaoDto,
        });

        await tx.produto.update({
          where: { id_produto: createProducaoDto.id_produto },
          data: {
            quantidade_estoque: {
              increment: createProducaoDto.quantidade_fabricada,
            },
          },
        });

        return novaProducao;
      });

    } catch (error) {
      console.error('Erro ao registrar produção:', error);
      throw new InternalServerErrorException('Não foi possível registrar a produção e atualizar o estoque.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.producao.findMany({
        include: {
          produto: true,
          funcionario: true,
        }
      });
    } catch (error) {
      console.error('Erro ao listar produções:', error);
      throw new InternalServerErrorException('Não foi possível listar as produções.');
    }
  }

  async findOne(id: number) {
    try {
      const producao = await this.prisma.producao.findUnique({
        where: { id_producao: id },
        include: {
          produto: true,
          funcionario: true,
        }
      });
      if (!producao) {
        throw new NotFoundException(`A produção com ID ${id} não foi encontrada.`);
      }

      return producao;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Erro ao buscar a produção ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar a produção.');
    }
  }

  async update(id: number, updateProducaoDto: UpdateProducaoDto) {
    await this.findOne(id);

    if (updateProducaoDto.quantidade_fabricada || updateProducaoDto.id_produto) {
      throw new BadRequestException('Não é permitido alterar o produto ou a quantidade de uma produção já registrada. Delete o registro e crie um novo.');
    }

    try {
      return await this.prisma.producao.update({
        where: { id_producao: id },
        data: updateProducaoDto,
      });
    } catch (error) {
      console.error(`Erro ao modificar produção ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar a produção.');
    }
  }

  async remove(id: number) {
    const producao = await this.findOne(id);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const producaoDeletada = await tx.producao.delete({
          where: { id_producao: id }
        });

        await tx.produto.update({
          where: { id_produto: producao.id_produto },
          data: {
            quantidade_estoque: {
              decrement: producao.quantidade_fabricada,
            },
          },
        });

        return producaoDeletada;
      });
    } catch (error) {
      console.error(`Erro ao deletar produção ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar a produção e estornar o estoque.');
    }
  }
}