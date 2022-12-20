import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailQueue } from './mail';

@Injectable()
export class QueueService implements OnModuleInit {
  async onModuleInit() {
    console.log("************ Queue connected ******************");
    this.listen();
  }
  
  async listen() {
    const mailQueue = new MailQueue();
    mailQueue.start();
  }
}