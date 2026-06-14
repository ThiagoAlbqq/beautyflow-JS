import { IsNumber, IsString, IsUUID, MaxLength, Min } from "class-validator";

export class CreateMaterialDto {
  @IsString({ message: 'O nome do material deve ser uma string' })
  @MaxLength(150, { message: 'O nome do material não pode ter mais de 150 caracteres' })
  nome!: string;

  @IsNumber({}, { message: 'A quantidade de estoque deve ser um número.' })
  @Min(0, { message: 'A quantidade em estoque não pode ser negativa.' })
  quantidade_disponivel!: number;

  @IsString({ message: 'A unidade de medida deve ser uma string' })
  @MaxLength(20, { message: 'A unidade de medida não pode ter mais de 20 caracteres' })
  unidade_medida!: string;

  @IsNumber({}, { message: 'O id do fornecedor deve ser um número.' })
  @Min(0, { message: 'O id do fornecedor não pode ser negativa.' })
  id_fornecedor!: number;
}
