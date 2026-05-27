-- CreateTable
CREATE TABLE "produtos" (
    "id_produto" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "categoria" VARCHAR(100) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "funcionario" (
    "id_funcionario" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "cargo" VARCHAR(100) NOT NULL,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("id_funcionario")
);

-- CreateTable
CREATE TABLE "fornecedor" (
    "id_fornecedor" SERIAL NOT NULL,
    "nome_empresa" VARCHAR(150) NOT NULL,
    "contato_nome" VARCHAR(150) NOT NULL,
    "telefone" VARCHAR(20),

    CONSTRAINT "fornecedor_pkey" PRIMARY KEY ("id_fornecedor")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "contato" VARCHAR(150),

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "material" (
    "id_material" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "quantidade_disponivel" INTEGER NOT NULL DEFAULT 0,
    "unidade_medida" VARCHAR(20) NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id_material")
);

-- CreateTable
CREATE TABLE "producao" (
    "id_producao" SERIAL NOT NULL,
    "data_fabricacao" DATE NOT NULL,
    "quantidade_fabricada" INTEGER NOT NULL,
    "lote" VARCHAR(50) NOT NULL,
    "validade" DATE NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "id_funcionario" INTEGER NOT NULL,

    CONSTRAINT "producao_pkey" PRIMARY KEY ("id_producao")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id_pedido" SERIAL NOT NULL,
    "data_hora" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "status_pagamento" VARCHAR(50) NOT NULL,
    "id_cliente" INTEGER NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "produto_material" (
    "quantidade_necessaria" DECIMAL(10,3) NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "id_material" INTEGER NOT NULL,

    CONSTRAINT "produto_material_pkey" PRIMARY KEY ("id_produto","id_material")
);

-- CreateTable
CREATE TABLE "item_pedido" (
    "quantidade" INTEGER NOT NULL,
    "preco_praticado" DECIMAL(10,2) NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "item_pedido_pkey" PRIMARY KEY ("id_pedido","id_produto")
);

-- CreateTable
CREATE TABLE "movimentacao_material" (
    "id_movimentacao" SERIAL NOT NULL,
    "tipo_movimentacao" VARCHAR(10) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data_hora" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" VARCHAR(255),
    "id_material" INTEGER NOT NULL,

    CONSTRAINT "movimentacao_material_pkey" PRIMARY KEY ("id_movimentacao")
);

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "fornecedor"("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producao" ADD CONSTRAINT "producao_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producao" ADD CONSTRAINT "producao_id_funcionario_fkey" FOREIGN KEY ("id_funcionario") REFERENCES "funcionario"("id_funcionario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_material" ADD CONSTRAINT "produto_material_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_material" ADD CONSTRAINT "produto_material_id_material_fkey" FOREIGN KEY ("id_material") REFERENCES "material"("id_material") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido"("id_pedido") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacao_material" ADD CONSTRAINT "movimentacao_material_id_material_fkey" FOREIGN KEY ("id_material") REFERENCES "material"("id_material") ON DELETE RESTRICT ON UPDATE CASCADE;
