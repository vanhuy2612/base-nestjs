import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUES, QUEUE_PROCESS } from '../common';
import { BaseProcessor } from '../base/base.processor';

@Processor(QUEUES.MAIL)
export class MailProcessor extends BaseProcessor {
  @Process(QUEUE_PROCESS.SEND_MAIL)
  async handle(job: Job<unknown>) {
    console.log("JOB ID:", job.id);
    console.log("Start handling...");
    console.log(this.loggerService);
    const allUsers = await this.prismaService.account.findMany();
    console.log("After get all");
    this.loggerService.log('Mail Consumer', allUsers);
    await this.prismaService.account.update({
      where: {
        id: 1,
      },
      data: {
        name: 'HuyDV3',
      },
    });
    return true;
  }
}