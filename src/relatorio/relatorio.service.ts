import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriaProduto, StatusPagamento } from '@prisma/client';

@Injectable()
export class RelatorioService {
  constructor(private readonly prisma: PrismaService) { }

  // Equivalente

  // SELECT
  //     id_produto,
  //     nome,
  //     categoria,
  //     preco,
  //     quantidade_estoque
  // FROM produtos
  // WHERE categoria = 'ELETRODOMESTICO';

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

  // Equivalente

  // SELECT
  //     COUNT(id_produto),
  //     MAX(preco),
  //     MIN(preco)
  // FROM produtos;

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

  // Equivalente

  // SELECT
  //     p.id_pedido,
  //     p.data_hora,
  //     p.valor_total,
  //     p.status_pagamento,
  //     p.id_cliente,
  //     c.id_cliente,
  //     c.nome,
  //     c.contato
  // FROM pedido p
  // LEFT JOIN cliente c
  //     ON p.id_cliente = c.id_cliente
  // WHERE p.status_pagamento = $1;

  async relatorioPedidosClientes(status?: StatusPagamento) {
    return await this.prisma.pedido.findMany({
      where: {
        status_pagamento: status ? status : undefined,
      },
      relationLoadStrategy: 'join',
      include: {
        cliente: true,
      },
    });
  }
}