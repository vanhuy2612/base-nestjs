import { Global, Module } from '@nestjs/common';
import { KafkaMicroservice } from './index.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthConsumer } from './consumer/auth.consumer';
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
                    }
                }
            },
        ]),
    ],
    controllers: [],
    providers: [KafkaMicroservice, AuthConsumer,],
    exports: [KafkaMicroservice, AuthConsumer,],
})
export class KafkaModule { }
