import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { LoginRequestBody } from './common';
import { AuthService } from './auth.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { Exception } from '@root/libs/core/exception/Exception';
import { RequestT } from '@root/libs/core/request';
import { LoginResponse } from '@root/apps/dto/response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('AUTH_MICROSERVICE') private readonly kafkaCli: ClientKafka,
  ) { }

  async onModuleInit() {
    ['user_login'].forEach((key) => this.kafkaCli.subscribeToResponseOf(`${key}`));
    await this.kafkaCli.connect();
  }

  async onModuleDestroy() {
    await this.kafkaCli.close();
  }

  @Post('login')
  async login(
    @Body() params: LoginRequestBody,
    @Req() req: RequestT,
  ): Promise<LoginResponse> {
    try {
      const res = await this.authService.login(params);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }

  @MessagePattern('user_login')
  handleUserLogin(data: any) {
    console.log("Data from handle user login", data);
  }
}
