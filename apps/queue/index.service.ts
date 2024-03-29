import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';
import { QUEUES } from './common';

@Injectable()
export class QueueService implements OnModuleInit {
  constructor(@InjectQueue(QUEUES.MAIL) readonly mailQueue: Queue) {}

  async onModuleInit() {
    console.log('************ Queue is running ******************');
  }
}
