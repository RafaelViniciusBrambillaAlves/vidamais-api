// src/Controllers/sms.controller.ts
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SmsService } from '../Services/sms.service';

@Controller('/api/sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('resend')
  async resendCode(@Request() req) {
    const userId = req.user.sub;
    await this.smsService.generateAndSendSmsCode(userId);
    return { success: true, message: 'Código reenviado com sucesso' };
  }
}