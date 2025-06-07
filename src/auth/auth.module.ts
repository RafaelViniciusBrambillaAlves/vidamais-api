import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { User } from '../entity/user.entity';
import { SmsCode } from '../entity/sms-code.entity';
import { AuthController } from '../Controllers/Auth.controller';
import { AuthService } from '../Services/Auth.service';
import { SmsService } from 'src/Services/sms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SmsCode]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SmsService],
})
export class AuthModule {}