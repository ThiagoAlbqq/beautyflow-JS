import { IsString, IsNumber, IsOptional, MaxLength, Min, IsPositive } from 'class-validator';

export class CreateProdutoDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(150, { message: 'O nome não pode ter mais de 150 caracteres.' })
  nome!: string;

  @IsString({ message: 'A categoria deve ser uma string.' })
  @MaxLength(100, { message: 'A categoria não pode ter mais de 100 caracteres.' })
  categoria!: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço deve ser um número válido.' })
  @IsPositive({ message: 'O preço deve ser maior que zero.' })
  preco!: number;

  @IsOptional()
  @IsNumber({}, { message: 'A quantidade de estoque deve ser um número.' })
  @Min(0, { message: 'A quantidade em estoque não pode ser negativa.' })
  quantidade_estoque?: number;
}