import { IsEnum, IsString, MaxLength } from "class-validator";
import { CargoFuncionario } from '@prisma/client';

export class CreateFuncionarioDto {
  @IsString({ message: 'O nome deve ser uma String' })
  @MaxLength(150, { message: 'O nome não pode ter mais de 150 caracteres ' })
  nome!: string;

  @IsEnum(CargoFuncionario, {
    message: 'O cargo deve ser uma opção válida: OPERADOR_PRODUCAO, QUIMICO_RESPONSAVEL, ESTOQUISTA, VENDEDOR ou GERENTE.'
  })
  cargo!: CargoFuncionario;
}
