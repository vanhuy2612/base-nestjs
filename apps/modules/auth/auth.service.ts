import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { AccountT } from '@root/libs/core/database/common';
import Env from '@root/libs/Env';
import { BaseService } from '../base/base.service';
import { LoginRequestBody } from './common';
import { EVENT_NAMES } from '@root/apps/events/common';
import UserLoginEvent from '@root/apps/events/model/UserLoginEvent';
import { APIException } from '@root/libs/core/exception/APIException';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { QueueService } from '@root/apps/queue/index.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    readonly prismaService: PrismaService,
    readonly loggerService: LoggerService,
    readonly queueService: QueueService,
    readonly jwtService: JwtService,
    readonly eventEmitter: EventEmitter2,
    @Inject('AUTH_MICROSERVICE') private readonly kafkaCli: ClientKafka,
  ) {
    super(prismaService, loggerService, queueService, jwtService, eventEmitter);
  }

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

    this.eventEmitter.emit(
      EVENT_NAMES.USER_LOGIN,
      new UserLoginEvent(username),
    );

    this.kafkaCli.emit('user_login', JSON.stringify({ account }));

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
