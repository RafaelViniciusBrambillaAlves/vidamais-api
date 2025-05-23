import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './Services/app.service';

@Controller('/api/auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('/login')
  // login(): User {
  //   return this.app
  // }
}
