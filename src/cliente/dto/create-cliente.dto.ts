import { IsString, MaxLength } from "class-validator"

export class CreateClienteDto {
  @IsString({ message: 'O nome do cliente deve ser uma string' })
  @MaxLength(150, { message: 'O nome do cliente não pode ter mais de 150 caracteres' })
  nome!: string

  @IsString({ message: 'O contato do cliente deve ser uma string' })
  @MaxLength(150, { message: 'O contato do cliente não pode ter mais de 150 caracteres' })
  contato?: string
}
