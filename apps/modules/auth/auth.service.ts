import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { AccountT } from '@root/libs/core/database/common';
import Env from '@root/libs/Env';
import { BaseService } from '../base/base.service';
import { EVENT_NAMES } from '@root/apps/events/common';
import UserLoginEvent from '@root/apps/events/model/UserLoginEvent';
import { APIException } from '@root/libs/core/exception/APIException';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { QueueService } from '@root/apps/queue/index.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessageKey } from '@root/libs/core/exception/lang';
import { LoginResponse } from '@root/apps/dto/response';
import { KafkaService } from '@root/libs/core/kafka/index.service';
import { TOPIC } from '@root/libs/core/kafka/common';
import { QUEUE_PROCESS } from '@root/apps/queue/common';
import { LoginRequest } from '@root/apps/dto/request';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    readonly prismaService: PrismaService,
    readonly loggerService: LoggerService,
    readonly queueService: QueueService,
    readonly jwtService: JwtService,
    readonly eventEmitter: EventEmitter2,
    readonly kafkaCli: KafkaService,
  ) {
    super(prismaService, loggerService, queueService, jwtService, eventEmitter);
  }

  async login(params: LoginRequest): Promise<LoginResponse> {
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
    if (!account) throw new APIException(HttpStatus.NOT_FOUND, ErrorMessageKey.UNKNOWN);
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

    this.kafkaCli.client.emit(TOPIC.USER_LOGIN, JSON.stringify({ account }));
    await this.queueService.mailQueue.add(QUEUE_PROCESS.SEND_MAIL, {
      account,
    });
    return {
      statusCode: HttpStatus.OK,
      data: {
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
      }
    };
  }
}
