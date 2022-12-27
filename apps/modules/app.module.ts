import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
