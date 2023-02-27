import { Injectable, UseInterceptors } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { AccountT } from '@root/libs/core/database';
import Env from '@root/libs/Env';
import { BaseService } from '../base/base.service';
import { LoginRequestBody } from './auth';
import { EVENT_NAMES } from '@root/apps/events/common';
import UserLoginEvent from '@root/apps/events/model/UserLoginEvent';
import { APIException } from '@root/libs/core/exception/APIException';

@Injectable()
export class AuthService extends BaseService {
  async login(params: LoginRequestBody): Promise<any> {
    const { username, password } = params;
    const account: AccountT | null = await this.prismaService.account.findFirst(
      {
        where: {
          email: username,
        },
        include: {
          role: true,
        },
      },
    );
    if (!account) throw new APIException(404, 'ACCOUNT_NOT_FOUND', {});
    let permissions: Permission[];
    if (account.role.key === 'root') {
      permissions = await this.prismaService.permission.findMany();
    } else {
      permissions = await this.prismaService.permission.findMany({
        where: {
          grantPermissions: {
            some: {
              roleId: account.roleId,
            },
          },
        },
      });
    }

    await this.eventEmitter.emit(
      EVENT_NAMES.USER_LOGIN,
      new UserLoginEvent(username),
    );

    return {
      token: this.jwtService.sign(
        {
          ...account,
          permissions: permissions.map((permission) => permission.key),
        },
        {
          secret: Env.get('JWT_SECRET', 'nguoianhmuonquen'),
          expiresIn: '1h',
        },
      ),
      permissions: permissions.map((permission) => permission.key),
    };
  }
}
