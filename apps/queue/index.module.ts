import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import Env from '@root/libs/Env';
import { PrismaModule } from '../../libs/core/database/index.module';
import { QueueService } from './index.service';
import { LoggerModule } from '../../libs/core/logger/index.module';
import { MailProcessor } from './mail/mail.processor';
import { QUEUES } from './common';

const queues_names: string[] = Object.keys(QUEUES);

@Module({
  imports: [
    PrismaModule,
    LoggerModule,
    BullModule.forRoot({
      redis: {
        host: Env.get('REDIS_HOST', 'localhost'),
        port: Env.get('REDIS_PORT', 6379),
      },
    }),
    // Register queue
    ...queues_names.map(queue => BullModule.registerQueue({
      name: queue,
    })),
  ],
  controllers: [],
  providers: [QueueService, MailProcessor],
  exports: [QueueService, MailProcessor],
})

export class QueueModule {

}
