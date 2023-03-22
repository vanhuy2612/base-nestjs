import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobService } from './index.service';
import { PingCronjob } from './ping/ping.cron';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [CronjobService, PingCronjob],
  exports: [CronjobService, PingCronjob],
})
export class CronjobModule {}
