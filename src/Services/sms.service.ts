// src/Services/sms.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as twilio from 'twilio';
import { User } from '../entity/user.entity';
import { SmsCode } from '../entity/sms-code.entity';
import { JwtService } from '@nestjs/jwt';
import { SmsVerificationDto } from 'src/DTOs/SmsVerificationDto';

@Injectable()
export class SmsService {
  private twilioClient: twilio.Twilio;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(SmsCode)
    private smsCodeRepository: Repository<SmsCode>,
    private jwtService: JwtService,
  ) {
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async generateAndSendSmsCode(userId: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Limpa códigos anteriores não verificados
    await this.smsCodeRepository.delete({ 
      // user: { id: userId },
      userId: userId,
      verified: false 
    });

    // Gera novo código
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Salva no banco
    await this.smsCodeRepository.save({
      phone: user.phone,
      code,
      verified: false,
      userId: userId
    });

    try {
      // Garanta o formato E.164: [+] [código do país] [número]
      const formattedPhone = user.phone.startsWith('+') 
        ? user.phone 
        : `+55${user.phone.replace(/\D/g, '')}`;
      
      // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // await this.twilioClient.messages.create({
      //   body: `Seu código de verificação é: ${code}`,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: formattedPhone // ← Use o número formatado
      // });
      
      console.log(`SMS enviado para ${formattedPhone}`);
    } catch (error) {
      console.error('Erro detalhado:', error);
      throw new Error('Falha no envio do SMS');
    }

    // Debug mode
    console.log(`[DEV] Código SMS para ${user.phone}: ${code}`);
  }

  async verifySmsCode(dto: SmsVerificationDto): Promise<{ isValid: boolean; user?: User; token?: string }> {
    const smsCode = await this.smsCodeRepository.findOne({
      where: { phone: dto.phone, code: dto.code },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    if (!smsCode || smsCode.verified) {
      return { isValid: false };
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (smsCode.createdAt < fiveMinutesAgo) {
      return { isValid: false };
    }

    await this.smsCodeRepository.update(smsCode.id, { verified: true });
    await this.usersRepository.update(smsCode.user.id, { smsVerified: true });

    const payload = { sub: smsCode.user.id, cpf: smsCode.user.cpf };
    const token = this.jwtService.sign(payload);
    
    return { 
      isValid: true, 
      user: smsCode.user,
      token: token
    };
  }
}