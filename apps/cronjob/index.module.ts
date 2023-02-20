import { Module } from '@nestjs/common';
import Env from '@root/libs/Env';
import { PrismaModule } from '../../libs/core/database/index.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobService } from './index.service';
import { PingCronjob } from './ping/ping.cron';
import { LoggerModule } from '../../libs/core/logger/index.module';

@Module({
  imports: [
    PrismaModule,
    LoggerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [CronjobService, PingCronjob],
  exports: [CronjobService, PingCronjob],
})

export class CronjobModule {

}
