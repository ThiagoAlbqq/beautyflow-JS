
INSERT INTO fornecedor (nome_empresa, contato_nome, telefone) VALUES
  ('Química Natura Ltda',   'Renata Souza',   '(11) 91234-5678'),
  ('Aromax Ingredientes',   'Carlos Mendes',  '(21) 98765-4321'),
  ('BioEssence Brasil',     'Patrícia Lima',  NULL);

INSERT INTO cliente (nome, contato) VALUES
  ('Salão Bella Vista',  'bella@vista.com.br'),
  ('Spa Urban Glow',     '(85) 99001-2233'),
  ('Maria das Graças',   NULL);

INSERT INTO funcionario (nome, cargo) VALUES
  ('Lucas Ferreira',   'QUIMICO_RESPONSAVEL'),
  ('Ana Paula Rocha',  'OPERADOR_PRODUCAO'),
  ('Diego Alves',      'ESTOQUISTA'),
  ('Juliana Costa',    'VENDEDOR'),
  ('Roberto Nunes',    'GERENTE');

INSERT INTO material (nome, quantidade_disponivel, unidade_medida, id_fornecedor) VALUES
  ('Ácido Hialurônico',     500,  'G',       1),
  ('Óleo de Argan',         300,  'ML',      2),
  ('Vitamina C Estabilizada',200, 'G',       1),
  ('Manteiga de Karité',    400,  'G',       3),
  ('Água Termal',           10,   'L',       2),
  ('Extrato de Aloe Vera',  600,  'ML',      3),
  ('Pó de Mica',            150,  'G',       2),
  ('Álcool Cetílico',       800,  'G',       1);

INSERT INTO produtos (nome, categoria, preco, quantidade_estoque) VALUES
  ('Sérum Facial Hialurônico',  'SKINCARE',    89.90,  50),
  ('Óleo Capilar de Argan',     'CAPILAR',     59.90,  80),
  ('Iluminador Mineral',        'MAQUIAGEM',   49.90,  60),
  ('Hidratante Corporal Karité','CORPORAL',     39.90, 100),
  ('Água Micelar Refrescante',  'SKINCARE',    34.90,  75);

INSERT INTO produto_material (id_produto, id_material, quantidade_necessaria) VALUES
  (1, 1, 5.000),
  (1, 3, 2.500),
  (1, 5, 50.000);

INSERT INTO produto_material (id_produto, id_material, quantidade_necessaria) VALUES
  (2, 2, 30.000),
  (2, 6, 20.000);

INSERT INTO produto_material (id_produto, id_material, quantidade_necessaria) VALUES
  (3, 7, 8.000),
  (3, 3, 1.000);

INSERT INTO produto_material (id_produto, id_material, quantidade_necessaria) VALUES
  (4, 4, 40.000),
  (4, 8, 15.000),
  (4, 6, 25.000);

INSERT INTO produto_material (id_produto, id_material, quantidade_necessaria) VALUES
  (5, 5, 80.000),
  (5, 6, 10.000);

INSERT INTO pedido (data_hora, valor_total, status_pagamento, id_cliente) VALUES
  ('2025-03-10 09:30:00', 179.80, 'PAGO',      1),
  ('2025-04-22 14:15:00',  89.90, 'PAGO',      2),
  ('2025-05-05 11:00:00', 149.70, 'PENDENTE',  3),
  ('2025-05-18 16:45:00',  49.90, 'CANCELADO', 1);

INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_praticado) VALUES
  (1, 1, 1, 89.90),
  (1, 2, 1, 59.90);

INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_praticado) VALUES
  (2, 1, 1, 89.90);

INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_praticado) VALUES
  (3, 4, 1, 39.90),
  (3, 5, 1, 34.90),
  (3, 3, 1, 49.90);

INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_praticado) VALUES
  (4, 3, 1, 49.90);

INSERT INTO producao (data_fabricacao, quantidade_fabricada, lote, validade, id_produto, id_funcionario) VALUES
  ('2025-01-15', 200, 'LOT-2025-001', '2027-01-15', 1, 1),
  ('2025-02-10', 150, 'LOT-2025-002', '2027-02-10', 2, 2),
  ('2025-03-05', 300, 'LOT-2025-003', '2026-09-05', 3, 1),
  ('2025-04-01', 250, 'LOT-2025-004', '2027-04-01', 4, 2),
  ('2025-04-20', 180, 'LOT-2025-005', '2027-04-20', 5, 1);

INSERT INTO movimentacao_material (tipo_movimentacao, quantidade, data_hora, motivo, id_material) VALUES
  ('ENTRADA', 1000, '2025-01-10 08:00:00', 'Compra inicial fornecedor Química Natura', 1),
  ('SAIDA',    500, '2025-01-15 09:00:00', 'Uso na produção LOT-2025-001',             1),
  ('ENTRADA',  500, '2025-02-01 08:00:00', 'Reposição de estoque',                     2),
  ('SAIDA',    200, '2025-02-10 10:00:00', 'Uso na produção LOT-2025-002',             2),
  ('ENTRADA',  400, '2025-03-01 08:00:00', 'Compra fornecedor Aromax',                 3),
  ('SAIDA',    200, '2025-03-05 11:00:00', 'Uso na produção LOT-2025-003',             3),
  ('ENTRADA',  600, '2025-03-15 08:00:00', 'Compra fornecedor BioEssence',             6),
  ('SAIDA',    100, '2025-04-01 09:30:00', 'Uso na produção LOT-2025-004',             6);
