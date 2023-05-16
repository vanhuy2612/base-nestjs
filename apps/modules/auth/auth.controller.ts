import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { Exception } from '@root/libs/core/exception/Exception';
import { RequestT } from '@root/libs/core/request';
import { LoginResponse } from '@root/apps/dto/response';
import { TOPIC } from '@root/libs/core/kafka/common';
import { LoginRequest } from '@root/apps/dto/request';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiExceptionResponse,
  CustomApiOKResponse,
} from '@root/apps/decorator/response.decorator';
import { LoggerService } from '@root/libs/core/logger/index.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) { }

  @Post('login')
  @CustomApiOKResponse(LoginResponse)
  @ApiExceptionResponse()
  async login(
    @Body() params: LoginRequest,
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
    this.logger.log(
      `Auth Controller Data from consumer ${TOPIC.USER_LOGIN} `,
      message,
      context.getTopic(),
    );
  }
}
