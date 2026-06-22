import { IsDate, IsInt, IsNumber, IsString, MaxLength, Min, IsArray, ValidateNested, IsPositive, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusPagamento } from '@prisma/client';

class ItemPedidoDto {
  @IsInt({ message: 'O id do produto deve ser um número inteiro.' })
  @Min(1, { message: 'O id do produto é inválido.' })
  id_produto!: number;

  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @Min(1, { message: 'A quantidade deve ser de pelo menos 1.' })
  quantidade!: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço praticado deve ser um número válido.' })
  @IsPositive({ message: 'O preço praticado deve ser maior que zero.' })
  preco_praticado!: number;
}

export class CreatePedidoDto {
  @Type(() => Date)
  @IsDate({ message: 'A data do pedido deve ser uma data válida.' })
  data_hora!: Date;

  @IsNumber({}, { message: 'O valor total deve ser um número.' })
  @Min(0, { message: 'O valor total não pode ser negativo.' })
  valor_total!: number;

  @IsEnum(StatusPagamento, {
    message: 'O status de pagamento deve ser uma opção válida: PENDENTE, PAGO, CANCELADO ou ESTORNADO.'
  })
  status_pagamento!: StatusPagamento;

  @IsInt({ message: 'O id do cliente deve ser um número inteiro.' })
  @Min(1, { message: 'O id do cliente é inválido.' })
  id_cliente!: number;

  @IsArray({ message: 'Os itens do pedido devem ser uma lista (array).' })
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  itens!: ItemPedidoDto[];
}