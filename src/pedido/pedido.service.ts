import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      return await this.prisma.pedido.create({
        data: createPedidoDto,
      });
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new InternalServerErrorException('Não foi possível criar o pedido.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.pedido.findMany();
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      throw new InternalServerErrorException('Não foi possível listar os pedidos.');
    }
  }

  async findOne(id: number) {
    try {
      const pedido = await this.prisma.pedido.findUnique({
        where: { id_pedido: id }
      });
      if (!pedido) {
        throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
      }

      return pedido;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Erro ao buscar o pedido ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar o pedido.');
    }
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    await this.findOne(id);

    try {
      return await this.prisma.pedido.update({
        where: { id_pedido: id },
        data: updatePedidoDto,
      });
    } catch (error) {
      console.error(`Erro ao modificar pedido ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar o pedido.');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.pedido.delete({
        where: { id_pedido: id }
      });
    } catch (error) {
      console.error(`Erro ao deletar pedido ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar o pedido.');
    }
  }
}
