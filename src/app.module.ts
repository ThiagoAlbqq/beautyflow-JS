import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutosModule } from './produtos/produtos.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';

@Module({
  imports: [PrismaModule, ProdutosModule, FuncionarioModule, FornecedorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
