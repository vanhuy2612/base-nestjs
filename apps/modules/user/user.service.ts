import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { QueueService } from '@root/apps/queue/index.service';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  PaginationResponse,
  UserUpdateResponse,
} from '@root/apps/dto/response';
import { Account } from '@prisma/client';

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

  async index(): Promise<PaginationResponse<Account>> {
    const users = await this.prismaService.account.findMany();
    return {
      status: HttpStatus.OK,
      data: users,
      total: users.length,
      page: 1,
      size: 10,
    };
  }

  async edit(): Promise<UserUpdateResponse> {
    return {
      status: HttpStatus.OK,
      data: true,
    };
  }
}
