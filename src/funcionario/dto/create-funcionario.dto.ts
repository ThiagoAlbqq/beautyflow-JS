import { IsString, MaxLength } from "class-validator";

export class CreateFuncionarioDto {
  @IsString({ message: 'O nome deve ser uma String' })
  @MaxLength(150, { message: 'O nome não pode ter mais de 150 caracteres ' })
  nome!: string;

  @IsString({ message: 'O cargo deve ser uma string ' })
  @MaxLength(100, { message: ' O nome  nao pode ter mais de 100 caracteres' })
  cargo!: string;
}
