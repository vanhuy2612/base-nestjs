import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { QueueService } from '@root/apps/queue/index.service';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginatedResponse, UserUpdateResponse } from '@root/apps/dto/response';
import { Account } from '@prisma/client';
import { SocketIOGateway } from '@root/apps/socket/index.gateway';

@Injectable()
export class UserService extends BaseService {
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService,
    readonly queueService: QueueService,
    readonly jwtService: JwtService,
    readonly eventEmitter: EventEmitter2,
    readonly socketIOGateway: SocketIOGateway,
  ) {
    super(
      prismaService,
      logger,
      queueService,
      jwtService,
      eventEmitter,
      socketIOGateway,
    );
  }

  async index(): Promise<PaginatedResponse<Account>> {
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
