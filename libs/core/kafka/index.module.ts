import { Global, Module } from '@nestjs/common';
import { KafkaService } from './index.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from './config';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: config.injectionToken,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config.clientId,
            brokers: [`${config.host}:${config.port}`],
          },
          consumer: {
            groupId: config.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
