import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config as kafkaConfig } from '@root/libs/core/kafka/config'
@Module({
  imports: [
    JwtModule,
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'AUTH_MICROSERVICE',
            brokers: [`${kafkaConfig.host}:${kafkaConfig.port}`],
          },
          consumer: {
            groupId: kafkaConfig.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
