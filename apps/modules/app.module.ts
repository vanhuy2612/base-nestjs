import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BaseModule } from './base/base.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@root/libs/core/database/index.module';
import { LoggerModule } from '@root/libs/core/logger/index.module';
import { QueueModule } from '@root/apps/queue/index.module';
import { CronjobModule } from '@root/apps/cronjob/index.module';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { PermissionMiddleware } from '../middleware/PermissionMiddleware';
import { JwtModule } from '@nestjs/jwt';
import Env from '@root/libs/Env';

ConfigModule.forRoot();
@Module({
  imports: [
    BaseModule,
    PrismaModule,
    CronjobModule,
    QueueModule,
    LoggerModule,
    JwtModule.register({
      secret: Env.get('JWT_SECRET', 'nguoianhmuonquen'),
      signOptions: { expiresIn: '120s' }
    }),
  ],
  controllers: [],
  providers: [],
})

// export class AppModule {

// }

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, PermissionMiddleware("users.index")).forRoutes({ path: 'users', method: RequestMethod.GET });
    consumer.apply(AuthMiddleware, PermissionMiddleware("users.create")).forRoutes({ path: 'users', method: RequestMethod.POST });
    consumer.apply(AuthMiddleware, PermissionMiddleware("users.edit")).forRoutes({ path: 'users/:id', method: RequestMethod.PUT });
    consumer.apply(AuthMiddleware, PermissionMiddleware("users.delete")).forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
  }
}
