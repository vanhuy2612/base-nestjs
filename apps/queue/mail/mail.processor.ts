import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUES, QUEUE_PROCESS } from '../common';
import { BaseProcessor } from '../base/base.processor';

@Processor(QUEUES.MAIL)
export class MailProcessor extends BaseProcessor {
  @Process(QUEUE_PROCESS.SEND_MAIL)
  async handle(job: Job<unknown>) {
    this.logger.log('JOB ID:', job.id);
    this.logger.log('Start handling...');
    const allUsers = await this.prismaService.account.findMany();
    this.logger.log('After get all');
    return true;
  }
}
