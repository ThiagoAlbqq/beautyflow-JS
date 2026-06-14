import { Type } from "class-transformer";
import { IsDate, IsInt, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreatePedidoDto {

  @Type(() => Date)
  @IsDate({ message: 'A data do pedido deve ser uma data válida.' })
  data_hora!: Date;

  @IsNumber({}, { message: 'O valor total deve ser um número inteiro.' })
  @Min(0, { message: 'O valor total não pode ser negativa.' })
  valor_total!: number;

  @IsString({ message: 'O status do pagamento deve ser uma string.' })
  @MaxLength(50, { message: 'O status do pagamento não pode ter mais de 50 caracteres.' })
  status_pagamento!: string;

  @IsInt({ message: 'O id do cliente deve ser um número inteiro.' })
  @Min(0, { message: 'O id do cliente não pode ser negativo.' })
  id_cliente!: number;

}
