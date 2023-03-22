import { Injectable } from '@nestjs/common';
import { QUEUE_PROCESS } from '@root/apps/queue/common';
import { APIException } from '@root/libs/core/exception/APIException';
import { BaseService } from '../base/base.service';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { QueueService } from '@root/apps/queue/index.service';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

  async index(): Promise<any> {
    throw new APIException(3000, 'List User Not Found.');
    const users = await this.prismaService.account.findMany();

    return {
      allUsers: [1, 2, 3],
    };
  }

  async edit(): Promise<any> {
    return {
      success: true,
    };
  }
}
