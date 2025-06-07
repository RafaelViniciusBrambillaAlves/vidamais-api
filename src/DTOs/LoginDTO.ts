import { IsEmail, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'CPF deve ser uma string' })
  @IsOptional()
  cpf?: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}