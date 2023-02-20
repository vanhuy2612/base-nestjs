import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { QueueService } from '@root/apps/queue/index.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../auth/auth';

@Injectable()
export class BaseService {
  constructor(
    readonly prismaService: PrismaService,
    readonly loggerService: LoggerService,
    readonly queueService: QueueService,
    readonly jwtService: JwtService,
  ) { }

}
