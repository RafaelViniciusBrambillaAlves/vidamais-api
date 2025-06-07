import { IsPhoneNumber, IsString, IsNotEmpty, Length } from 'class-validator';

export class SmsVerificationDto {
  @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
  @IsNotEmpty()
  phone: string;

  @IsString({ message: 'Código deve ser uma string' })
  @IsNotEmpty()
  @Length(6, 6, { message: 'Código deve ter 6 dígitos' })
  code: string;
}