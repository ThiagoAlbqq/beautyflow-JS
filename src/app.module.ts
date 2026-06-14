import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutosModule } from './produtos/produtos.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ClienteModule } from './cliente/cliente.module';
import { MaterialModule } from './material/material.module';
import { ProducaoModule } from './producao/producao.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [PrismaModule, ProdutosModule, FuncionarioModule, FornecedorModule, ClienteModule, MaterialModule, ProducaoModule, PedidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
