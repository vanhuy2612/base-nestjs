import { OnQueueActive, OnQueueRemoved, OnQueueCompleted } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../../../libs/core/database/index.service';
import { LoggerService } from '../../../libs/core/logger/index.service';

@Injectable()
export class BaseProcessor {
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data `);
  }

  @OnQueueRemoved()
  onRemoved(job: Job) {
    this.logger.log(`Removed job ${job.id} of type ${job.name} with data `);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(`Completed job ${job.id} of type ${job.name} with data `);
  }
}
