import { OnQueueActive, OnQueueRemoved, OnQueueCompleted } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../../../libs/core/database/index.service';
import { LoggerService } from '../../../libs/core/logger/index.service';

@Injectable()
export class BaseProcessor {
  constructor(
    readonly prismaService: PrismaService,
    readonly loggerService: LoggerService,
  ) { }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} with data `, job.data);
  }

  @OnQueueRemoved()
  onRemoved(job: Job) {
    console.log(`Removed job ${job.id} of type ${job.name} with data `, job.data);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Completed job ${job.id} of type ${job.name} with data `, job.data);
  }
}