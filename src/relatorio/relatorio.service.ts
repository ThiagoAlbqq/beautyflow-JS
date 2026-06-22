import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriaProduto, StatusPagamento } from '@prisma/client';

@Injectable()
export class RelatorioService {
  constructor(private readonly prisma: PrismaService) { }

  async relatorioProdutos(categoria?: CategoriaProduto, termoBusca?: string) {
    return await this.prisma.produto.findMany({
      where: {
        categoria: categoria ? categoria : undefined,
        nome: termoBusca
          ? {
            contains: termoBusca,
            mode: 'insensitive',
          }
          : undefined,
      },
    });
  }

  async relatorioMetricas() {
    return await this.prisma.produto.aggregate({
      _count: {
        id_produto: true,
      },
      _max: {
        preco: true,
      },
      _min: {
        preco: true,
      },
    });
  }

  async relatorioPedidosClientes(status?: StatusPagamento) {
    return await this.prisma.pedido.findMany({
      where: {
        status_pagamento: status ? status : undefined,
      },
      include: {
        cliente: true,
      },
    });
  }
}