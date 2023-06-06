import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@libs/core/database/index.module';
import { LoggerModule } from '@libs/core/logger/index.module';
import { SocketIOGateway } from './index.gateway';

@Global()
@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [],
  providers: [SocketIOGateway],
  exports: [SocketIOGateway],
})
export class SocketIOModule {}
