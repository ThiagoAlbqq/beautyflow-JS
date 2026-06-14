import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClienteService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createClienteDto: CreateClienteDto) {
    try {
      return await this.prisma.cliente.create({
        data: createClienteDto,
      });
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw new InternalServerErrorException('Não foi possível cadastrar o cliente.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.cliente.findMany();
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      throw new InternalServerErrorException('Não foi possível listar os clientes.');
    }
  }

  async findOne(id: number) {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id_cliente: id }
      });
      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }
      return cliente;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Erro ao buscar o cliente ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível buscar o cliente.');
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    await this.findOne(id);

    try {
      return await this.prisma.cliente.update({
        where: { id_cliente: id },
        data: updateClienteDto,
      });
    } catch (error) {
      console.error(`Erro ao modificar cliente ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível modificar o cliente.');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.cliente.delete({
        where: { id_cliente: id }
      });
    } catch (error) {
      console.error(`Erro ao deletar cliente ${id}:`, error);
      throw new InternalServerErrorException('Não foi possível deletar o cliente.');
    }
  }
}
