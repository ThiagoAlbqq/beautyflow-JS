import { Controller, Get, Query } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';
import { CategoriaProduto, StatusPagamento } from '@prisma/client';

@Controller('relatorio')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) { }

  @Get('produtos')
  relatorioProdutos(
    @Query('categoria') categoria?: CategoriaProduto,
    @Query('termoBusca') termoBusca?: string,
  ) {
    return this.relatorioService.relatorioProdutos(categoria, termoBusca);
  }

  @Get('metricas')
  relatorioMetricas() {
    return this.relatorioService.relatorioMetricas();
  }

  @Get('pedidos-clientes')
  relatorioPedidosClientes(
    @Query('status') status?: StatusPagamento,
  ) {
    return this.relatorioService.relatorioPedidosClientes(status);
  }
}