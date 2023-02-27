import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@root/libs/core/database/index.module';
import { LoggerModule } from '@root/libs/core/logger/index.module';
import { QueueModule } from '@root/apps/queue/index.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule, LoggerModule, QueueModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
