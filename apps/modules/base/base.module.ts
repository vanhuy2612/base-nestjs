import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserModule } from '@root/apps/modules/user/user.module';
import { AuthModule } from '@root/apps/modules/auth/auth.module';
import { PrismaModule } from '@root/libs/core/database/index.module';
import { LoggerModule } from '@root/libs/core/logger/index.module';
import { QueueModule } from '@root/apps/queue/index.module';

@Module({
    imports: [UserModule, AuthModule, PrismaModule, LoggerModule, QueueModule],
    controllers: [],
    providers: [BaseService],
    exports: [BaseService],
})
export class BaseModule { }
