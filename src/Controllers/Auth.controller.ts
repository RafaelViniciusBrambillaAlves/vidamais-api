import { Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'node_modules/class-validator/types';
import { CreateUserDto } from 'src/DTOs/CreateUserDto';
import { SmsVerificationDto } from 'src/DTOs/SmsVerificationDto';
import { AuthService } from 'src/Services/Auth.service';
import { SmsService } from 'src/Services/sms.service';

export class LoginDto {
  @IsString({ message: 'CPF deve ser uma string' })
  @IsOptional()
  cpf?: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly smsService: SmsService,
  ) {}


  @Post('/logon')
  async createUser(@Body() createUser: CreateUserDto) {
    const user = await this.authService.create(createUser);
    return this.authService.login(user);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    console.log(user)
    // this.authService.generateSmsCode(user.phone, user.id)
    return this.authService.login(user);
  }

  @Post('sms/verify')
  async verifySmsCode(@Body() dto: SmsVerificationDto) {
    const result = await this.smsService.verifySmsCode(dto);
    if (!result.isValid) {
      throw new UnauthorizedException('Código inválido ou expirado');
    }
    return { 
      success: true, 
      user: result.user, 
      token: result.token 
    };
  }
}
