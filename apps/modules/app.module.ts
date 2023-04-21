import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BaseModule } from './base/base.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@root/libs/core/database/index.module';
import { LoggerModule } from '@root/libs/core/logger/index.module';
import { QueueModule } from '@root/apps/queue/index.module';
import { CronjobModule } from '@root/apps/cronjob/index.module';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { PermissionMiddleware } from '../middleware/PermissionMiddleware';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from '@root/apps/events/index.module';
import { KafkaModule } from '@root/libs/core/kafka/index.module';

import Env from '@root/libs/Env';

ConfigModule.forRoot();
@Module({
  imports: [
    BaseModule,
    PrismaModule,
    CronjobModule,
    QueueModule,
    LoggerModule,
    KafkaModule,
    JwtModule.register({
      secret: Env.get('JWT_SECRET', 'nguoianhmuonquen'),
      signOptions: { expiresIn: '120s' },
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    EventModule,
  ],
  controllers: [],
  providers: [],
})

// export class AppModule {

// }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, PermissionMiddleware('users.index'))
      .forRoutes({ path: 'users', method: RequestMethod.GET });
    consumer
      .apply(AuthMiddleware, PermissionMiddleware('users.create'))
      .forRoutes({ path: 'users', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware, PermissionMiddleware('users.edit'))
      .forRoutes({ path: 'users/:id', method: RequestMethod.PUT });
    consumer
      .apply(AuthMiddleware, PermissionMiddleware('users.delete'))
      .forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
  }
}
