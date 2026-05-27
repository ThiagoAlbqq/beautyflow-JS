import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // <-- Importe aqui

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa a validação global dos DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // --- CONFIGURAÇÃO DO SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('API BeautyFlow') // Nome do seu projeto
    .setDescription('Documentação da API de Gestão e Produção')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // O primeiro parâmetro ('api') é a rota onde o Swagger vai ficar acessível
  SwaggerModule.setup('api', app, document);
  // -------------------------------

  await app.listen(3333);
}
bootstrap();