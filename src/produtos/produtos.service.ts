import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) { }

  private readonly include = {
    produto_materiais: {
      include: {
        material: true,
      },
    },
  };

  async create(createProdutoDto: CreateProdutoDto) {
    const { materiais, ...dadosProduto } = createProdutoDto;
    try {
      return await this.prisma.produto.create({
        data: {
          ...dadosProduto,
          ...(materiais?.length && {
            produto_materiais: {
              create: materiais.map((m) => ({
                id_material: m.id_material,
                quantidade_necessaria: m.quantidade_necessaria,
              })),
            },
          }),
        },
        include: this.include,
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new InternalServerErrorException('Não foi possível criar o produto.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.produto.findMany({ include: this.include });
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw new InternalServerErrorException('Não foi possível listar os produtos.');
    }
  }

  async findOne(id: number) {
    try {
      const produto = await this.prisma.produto.findUnique({
        where: { id_produto: id },
        include: this.include,
      });
      if (!produto) throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
      return produto;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(`Erro ao buscar o produto ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar o produto.');
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    await this.findOne(id);
    const { materiais, ...dadosProduto } = updateProdutoDto;

    try {
      return await this.prisma.$transaction(async (tx) => {
        if (materiais !== undefined) {
          await tx.produto_Material.deleteMany({
            where: { id_produto: id },
          });
        }

        return tx.produto.update({
          where: { id_produto: id },
          data: {
            ...dadosProduto,
            ...(materiais?.length && {
              produto_materiais: {
                create: materiais.map((m) => ({
                  id_material: m.id_material,
                  quantidade_necessaria: m.quantidade_necessaria,
                })),
              },
            }),
          },
          include: this.include,
        });
      });
    } catch (error) {
      console.error(`Erro ao modificar produto ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar o produto.');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      await this.prisma.produto_Material.deleteMany({
        where: { id_produto: id },
      });

      return await this.prisma.produto.delete({
        where: { id_produto: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new BadRequestException(
          'Não é possível deletar este produto pois existem registros de produção vinculados a ele.',
        );
      }
      console.error(`Erro ao deletar produto ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar o produto.');
    }
  }
}