import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/DTOs/CreateUserDto';
import { User } from 'src/entity/user.entity';
import { LoginDto } from 'src/DTOs/LoginDto';
import { SmsCode } from 'src/entity/sms-code.entity';
import { JwtService } from '@nestjs/jwt';
import { SmsVerificationDto } from 'src/DTOs/SmsVerificationDto';
import twilio from 'twilio';
import { UnauthorizedException } from '@nestjs/common';
import { SmsService } from './sms.service';

@Injectable()
export class AuthService {
  // private twilioClient: Twilio;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private smsService: SmsService,
  ) {
    // this.twilioClient = new Twilio(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN,
    // );
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      where: [
        { cpf: createUserDto.cpf }
      ],
    });

    if (userExists) {
      throw new ConflictException('Email ou CPF já cadastrado');
    }

    const salt = await bcrypt.genSalt();
    const user = this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, salt),
    });

    return this.usersRepository.save(user);
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const where = { cpf: loginDto.cpf };
    const user = await this.usersRepository.findOne({ where });

    if (!user) {
      throw new UnauthorizedException('CPF não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return user;
  }

  async login(user: User) {
    await this.smsService.generateAndSendSmsCode(user.id);
    
    const payload = { sub: user.id, cpf: user.cpf };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}