import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@root/libs/core/database';
import { LoggerService } from '@root/libs/core/logger';
import { QueueService } from '@root/libs/queue';
ConfigModule.forRoot();
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, LoggerService, QueueService],
})
export class AppModule {}
