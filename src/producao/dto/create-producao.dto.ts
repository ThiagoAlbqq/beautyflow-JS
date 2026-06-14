import { IsInt, Min, IsString, MaxLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProducaoDto {
  @Type(() => Date)
  @IsDate({ message: 'A data de fabricação deve ser uma data válida.' })
  data_fabricacao!: Date;

  @IsInt({ message: 'A quantidade fabricada deve ser um número inteiro.' })
  @Min(0, { message: 'A quantidade fabricada não pode ser negativa.' })
  quantidade_fabricada!: number;

  @IsString({ message: 'O lote deve ser uma string.' })
  @MaxLength(50, { message: 'O lote não pode ter mais de 50 caracteres.' })
  lote!: string;

  @Type(() => Date)
  @IsDate({ message: 'A validade deve ser uma data válida.' })
  validade!: Date;

  @IsInt({ message: 'O id do produto deve ser um número inteiro.' })
  @Min(0, { message: 'O id do produto não pode ser negativo.' })
  id_produto!: number;

  @IsInt({ message: 'O id do funcionario deve ser um número inteiro.' })
  @Min(0, { message: 'O id do funcionario não pode ser negativo.' })
  id_funcionario!: number;
}