import { 
    IsEmail, 
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsDateString,
    IsIn, 
    Length
  } from 'class-validator';
  
export class CreateUserDto {
  @IsString({ message: 'Nome completo é obrigatório' })
  @IsNotEmpty()
  fullName: string;

  @IsString({ message: 'CPF inválido' })
  @IsNotEmpty()
  cpf: string;

  @IsDateString({}, { message: 'Data de nascimento inválida' })
  @IsNotEmpty()
  birthDate: Date;

  @IsIn(['M', 'F', 'O'], { message: 'Sexo deve ser M, F ou O' })
  @IsNotEmpty()
  gender: string;

  @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
  @IsNotEmpty()
  phone: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty()
  @Length(6, 20, { message: 'Senha deve ter entre 6 e 20 caracteres' })
  password: string;
}