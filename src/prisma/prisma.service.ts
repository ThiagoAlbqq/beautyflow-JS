import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Cria a conexão direta usando a URL do seu .env
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('FALHA CRÍTICA: DATABASE_URL não foi encontrada no arquivo .env!');
    }

    const pool = new Pool({ connectionString });

    // 2. Cria o adaptador
    const adapter = new PrismaPg(pool);

    // 3. Passa o adaptador e os logs exigidos pelo Prisma 7
    super({
      adapter,
      log: ['query'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}