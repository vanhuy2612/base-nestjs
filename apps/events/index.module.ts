import { Module } from '@nestjs/common';
import Env from '@root/libs/Env';
import { PrismaModule } from '../../libs/core/database/index.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterService } from './index.service';
import { LoggerModule } from '../../libs/core/logger/index.module';
import { UserListener } from './user/user.listener';

@Module({
  imports: [
    PrismaModule,
    LoggerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [EventEmitterService, UserListener],
  exports: [EventEmitterService, UserListener],
})

export class EventModule {

}
