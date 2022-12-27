import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@root/libs/core/database';
import { LoggerService } from '@root/libs/core/logger';
import { QueueService } from '@root/libs/queue';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, LoggerService, QueueService],
})
export class UserModule {}
