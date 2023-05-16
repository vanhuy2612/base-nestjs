import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../libs/core/database/index.service';

@Injectable()
export class CronjobService implements OnModuleInit {
  constructor(readonly prismaService: PrismaService) { }

  async onModuleInit() {
    console.log('************ Cronjob is running ******************');
  }
}
