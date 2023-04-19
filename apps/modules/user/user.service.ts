import { HttpStatus, Injectable } from '@nestjs/common';
import { QUEUE_PROCESS } from '@root/apps/queue/common';
import { APIException } from '@root/libs/core/exception/APIException';
import { BaseService } from '../base/base.service';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { QueueService } from '@root/apps/queue/index.service';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ErrorMessageKey } from '@root/libs/core/exception/lang';
import { UserIndexResponse, UserUpdateResponse } from '@root/apps/dto/response';

@Injectable()
export class UserService extends BaseService {
  constructor(
    readonly prismaService: PrismaService,
    readonly loggerService: LoggerService,
    readonly queueService: QueueService,
    readonly jwtService: JwtService,
    readonly eventEmitter: EventEmitter2,
  ) {
    super(prismaService, loggerService, queueService, jwtService, eventEmitter);
  }

  async index(): Promise<UserIndexResponse> {
    const users = await this.prismaService.account.findMany();
    return {
      status: HttpStatus.OK,
      data: users,
    };
  }

  async edit(): Promise<UserUpdateResponse> {
    return {
      status: HttpStatus.OK,
      data: true,
    };
  }
}
