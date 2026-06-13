import { isString, IsString, MaxLength } from "class-validator";

export class CreateFornecedorDto {
  @IsString({ message: 'O nome da empresa deve ser uma string' })
  @MaxLength(150, { message: 'A categoria não pode ter mais de 150 caracteres' })
  nome_empresa!: string;

  @IsString({ message: 'O nome de contato deve ser uma string' })
  @MaxLength(150, { message: 'A categoria não pode ter mais de 150 caracteres' })
  contato_nome!: string;

  @IsString({ message: 'O numero de telefone deve ser uma string' })
  @MaxLength(20, { message: 'A categoria não pode ter mais de 20 caracteres' })
  num_contato?: string;
}
