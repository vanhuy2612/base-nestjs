import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserModule } from '@root/apps/modules/user/user.module';
import { AuthModule } from '@root/apps/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [UserModule, AuthModule, JwtModule, EventEmitterModule],
  controllers: [],
  providers: [BaseService],
  exports: [BaseService],
})
export class BaseModule {}
