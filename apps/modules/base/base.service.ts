import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { QueueService } from '@root/apps/queue/index.service';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SocketIOGateway } from '@root/apps/socket/index.gateway';

@Injectable()
export class BaseService {
  constructor(
    readonly prismaService: PrismaService,
    readonly loggerService: LoggerService,
    readonly queueService: QueueService,
    readonly jwtService: JwtService,
    readonly eventEmitter: EventEmitter2,
    readonly socketIOGateway: SocketIOGateway,
  ) { }
}
