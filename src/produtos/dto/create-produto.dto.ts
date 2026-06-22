import { IsString, MaxLength, IsNumber, IsPositive, IsOptional, Min, IsArray, ValidateNested, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoriaProduto } from '@prisma/client';

class ProdutoMaterialDto {
  @IsInt({ message: 'O id do material deve ser um número inteiro.' })
  @Min(1, { message: 'O id do material é inválido.' })
  id_material!: number;

  @IsNumber({ maxDecimalPlaces: 3 }, { message: 'A quantidade necessária deve ser um número válido.' })
  @IsPositive({ message: 'A quantidade necessária deve ser maior que zero.' })
  quantidade_necessaria!: number;
}

export class CreateProdutoDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(150, { message: 'O nome não pode ter mais de 150 caracteres.' })
  nome!: string;

  @IsEnum(CategoriaProduto, {
    message: 'A categoria deve ser uma opção válida: SKINCARE, MAQUIAGEM, CAPILAR, CORPORAL ou PERFUMARIA.'
  })
  categoria!: CategoriaProduto;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço deve ser um número válido.' })
  @IsPositive({ message: 'O preço deve ser maior que zero.' })
  preco!: number;

  @IsOptional()
  @IsNumber({}, { message: 'A quantidade de estoque deve ser um número.' })
  @Min(0, { message: 'A quantidade em estoque não pode ser negativa.' })
  quantidade_estoque?: number;

  @IsOptional()
  @IsArray({ message: 'Os materiais devem ser uma lista (array).' })
  @ValidateNested({ each: true })
  @Type(() => ProdutoMaterialDto)
  materiais?: ProdutoMaterialDto[];
}