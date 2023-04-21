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
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { Exception } from '@root/libs/core/exception/Exception';
import { RequestT } from '@root/libs/core/request';
import { LoginResponse } from '@root/apps/dto/response';
import { TOPIC } from '@root/libs/core/kafka/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

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

  @EventPattern(TOPIC.USER_LOGIN)
  async handle(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(`Auth Controller Data from consumer ${TOPIC.USER_LOGIN} `, message, context.getTopic());
  }
}
