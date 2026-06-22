import { IsEnum, IsNumber, IsString, IsUUID, MaxLength, Min } from "class-validator";
import { UnidadeMedida } from '@prisma/client';

export class CreateMaterialDto {
  @IsString({ message: 'O nome do material deve ser uma string' })
  @MaxLength(150, { message: 'O nome do material não pode ter mais de 150 caracteres' })
  nome!: string;

  @IsNumber({}, { message: 'A quantidade de estoque deve ser um número.' })
  @Min(0, { message: 'A quantidade em estoque não pode ser negativa.' })
  quantidade_disponivel!: number;

  @IsEnum(UnidadeMedida, {
    message: 'A unidade deve ser uma opção válida: UNIDADE, KG, G, L, ML, M, CM, M2, M3, CAIXA, PACOTE, ROLO e LATA.'
  })
  unidade_medida!: UnidadeMedida;

  @IsNumber({}, { message: 'O id do fornecedor deve ser um número.' })
  @Min(0, { message: 'O id do fornecedor não pode ser negativa.' })
  id_fornecedor!: number;
}
