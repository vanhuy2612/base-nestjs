import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { BaseProcessor } from '../base/base.processor';
import { QUEUES, QUEUE_PROCESS } from '../constant';

@Processor(QUEUES.MAIL)
export class MailProcessor extends BaseProcessor {
  @Process(QUEUE_PROCESS.SEND_MAIL)
  async handle(job: Job<unknown>) {
    console.log("JOB ID:", job.id);
    console.log("Start handling...");
    console.log(this.loggerService);
    const allUsers = await this.prismaService.user.findMany();
    console.log("After get all");
    this.loggerService.log('Mail Consumer', allUsers);
    await this.prismaService.user.update({
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