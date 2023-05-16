import { Controller, Get, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { Exception } from '@root/libs/core/exception/Exception';
import { RequestT } from '@root/libs/core/request';
import { UserService } from './user.service';
import {
  AccountDTO,
  PaginatedResponse,
  UserUpdateResponse,
} from '@root/apps/dto/response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiExceptionResponse,
  ApiPaginatedResponse,
} from '@root/apps/decorator/response.decorator';
import { AuthDecorator } from '@root/apps/decorator/auth.decorator';
import { Auth } from '../auth/common';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiBearerAuth()
  @ApiPaginatedResponse(AccountDTO)
  @ApiExceptionResponse()
  async index(
    @Req() req: RequestT,
    @AuthDecorator() auth: Auth,
  ): Promise<PaginatedResponse<AccountDTO>> {
    try {
      console.log('Request.users.index', auth, auth.permissions);
      const result = await this.userService.index();
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiExceptionResponse()
  async edit(
    @Req() req: RequestT,
    @Param('id', ParseIntPipe) id: number,
    @AuthDecorator() auth: Auth,
  ): Promise<UserUpdateResponse> {
    try {
      console.log('id', id);
      console.log('Request.users.edit', auth, auth.permissions);

      const result = await this.userService.edit();
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }
}
