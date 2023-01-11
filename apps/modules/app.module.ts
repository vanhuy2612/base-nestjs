import { Module } from '@nestjs/common';
import { BaseModule } from './base/base.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@root/libs/core/database/index.module';
import { LoggerModule } from '@root/libs/core/logger/index.module';
import { QueueModule } from '@root/apps/queue/index.module';
import { CronjobModule } from '@root/apps/cronjob/index.module';

ConfigModule.forRoot();
@Module({
  imports: [
    BaseModule,
    PrismaModule,
    CronjobModule,
    QueueModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
