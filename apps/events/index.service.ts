import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../libs/core/database/index.service';

@Injectable()
export class EventEmitterService implements OnModuleInit {
  constructor(readonly prismaService: PrismaService) {}

  async onModuleInit() {
    console.log('************ Event Emitter is running ******************');
  }
}
