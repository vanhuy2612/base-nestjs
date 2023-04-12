import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoginRequestBody } from './common';
import { AuthService } from './auth.service';
import { ResponseInterceptor } from '@root/libs/core/interceptor/response.interceptor';
import { ExceptionInterceptor } from '@root/libs/core/interceptor/exception.interceptor';

type LoginResponseT = {
  [key in string]: any;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UseInterceptors(ResponseInterceptor, ExceptionInterceptor)
  async login(@Body() params: LoginRequestBody): Promise<any> {
    try {
      const res = await this.authService.login(params);
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
