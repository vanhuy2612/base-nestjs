import { Controller, Get, Put, Req } from '@nestjs/common';
import { Exception } from '@root/libs/core/exception/Exception';
import { RequestT } from '@root/libs/core/request';
import { UserService } from './user.service';
import {
  AccountDTO,
  PaginationResponse,
  UserUpdateResponse,
} from '@root/apps/dto/response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiPaginationResponse } from '@root/apps/decorator/pagination.decorator';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiPaginationResponse(AccountDTO)
  async index(@Req() req: RequestT): Promise<PaginationResponse<AccountDTO>> {
    try {
      console.log('Request.users.index', req.auth, req.auth.permissions);
      const result = await this.userService.index();
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }

  @Put('/:id')
  @ApiBearerAuth()
  async edit(@Req() req: RequestT): Promise<UserUpdateResponse> {
    try {
      console.log('Request.users.edit', req.auth, req.auth.permissions);

      const result = await this.userService.edit();
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }
}
