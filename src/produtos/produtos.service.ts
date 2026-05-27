import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProdutoDto: CreateProdutoDto) {
    try {
      return await this.prisma.produto.create({
        data: createProdutoDto,
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new InternalServerErrorException('Não foi possível criar o produto.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.produto.findMany();
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw new InternalServerErrorException('Não foi possível listar os produtos.');
    }
  }

  async findOne(id: number) {
    try {
      const produto = await this.prisma.produto.findUnique({
        where: { id_produto: id }
      });

      // Se o Prisma não achar o registro, ele retorna null. 
      // Lançamos um 404 para o front-end saber que não existe.
      if (!produto) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
      }

      return produto;
    } catch (error) {
      // Se já for um erro 404 que nós mesmos lançamos, deixa ele subir
      if (error instanceof NotFoundException) throw error;

      console.error(`Erro ao buscar o produto ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar o produto.');
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    // 1. Verifica se o produto existe ANTES de atualizar. 
    // Se não existir, o findOne já lança o erro 404 automaticamente!
    await this.findOne(id);

    try {
      return await this.prisma.produto.update({
        where: { id_produto: id },
        // 2. O Prisma ignora automaticamente propriedades "undefined". 
        // Você não precisa fazer as verificações manuais com && {}.
        data: updateProdutoDto,
      });
    } catch (error) {
      console.error(`Erro ao modificar produto ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar o produto.');
    }
  }

  async remove(id: number) {
    // Mesma lógica: verifica se existe antes de tentar deletar
    await this.findOne(id);

    try {
      return await this.prisma.produto.delete({
        where: { id_produto: id }
      });
    } catch (error) {
      console.error(`Erro ao deletar produto ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar o produto.');
    }
  }
}