import { Controller, Get, Query } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';
import { CategoriaProduto, StatusPagamento } from '@prisma/client';

@Controller('relatorio')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) { }

  // Rota: GET /relatorio/produtos
  // Exemplo de uso: /relatorio/produtos?categoria=Doces&termoBusca=Chocolate
  @Get('produtos')
  relatorioProdutos(
    @Query('categoria') categoria?: CategoriaProduto,
    @Query('termoBusca') termoBusca?: string,
  ) {
    return this.relatorioService.relatorioProdutos(categoria, termoBusca);
  }

  // Rota: GET /relatorio/metricas
  @Get('metricas')
  relatorioMetricas() {
    return this.relatorioService.relatorioMetricas();
  }

  // Rota: GET /relatorio/pedidos-clientes
  // Exemplo de uso: /relatorio/pedidos-clientes?status=PAGO
  @Get('pedidos-clientes')
  relatorioPedidosClientes(
    @Query('status') status?: StatusPagamento,
  ) {
    return this.relatorioService.relatorioPedidosClientes(status);
  }
}