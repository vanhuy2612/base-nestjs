import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/core/database';
import { LoggerService } from '@root/libs/core/logger';
import { QueueService } from '@root/libs/queue';

@Injectable()
export class BaseService {
  constructor(
    readonly prismaService: PrismaService,
    readonly loggerService: LoggerService,
    readonly queueService: QueueService,
) {}
}
