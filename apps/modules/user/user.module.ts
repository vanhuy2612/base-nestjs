import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@root/libs/core/database/index.module';
import { LoggerModule } from '@root/libs/core/logger/index.module';
import { QueueModule } from '@root/apps/queue/index.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule, LoggerModule, QueueModule],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
