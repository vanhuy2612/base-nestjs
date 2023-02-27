import {
  Controller,
  Get,
  HttpCode,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Exception } from '@root/libs/core/exception/Exception';
import { ExceptionInterceptor } from '@root/libs/core/interceptor/exception.interceptor';
import { ResponseInterceptor } from '@root/libs/core/interceptor/response.interceptor';
import { RequestT } from '@root/libs/core/request';
import { ResponseT } from '@root/libs/core/response';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ResponseInterceptor, ExceptionInterceptor)
  async index(@Req() req: RequestT, @Res() res: ResponseT): Promise<string> {
    try {
      console.log('Request.users.index', req.auth, req.auth.permissions);
      const result = await this.userService.index();
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, res, e);
    }
  }

  @Put('/:id')
  @UseInterceptors(ResponseInterceptor, ExceptionInterceptor)
  async edit(@Req() req: RequestT, @Res() res: ResponseT): Promise<string> {
    try {
      console.log('Request.users.edit', req.auth, req.auth.permissions);

      const result = await this.userService.edit();
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, res, e);
    }
  }
}
