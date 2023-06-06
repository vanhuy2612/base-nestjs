import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';

@Injectable()
export class EventEmitterService implements OnModuleInit {
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService,
  ) {}

  async onModuleInit() {
    this.logger.log('************ Event Emitter is running ******************');
  }
}
