import { INestApplication } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { config as kafkaConfig } from '@root/libs/core/kafka/config';

export class KafkaMicroservice {
    private readonly app: INestApplication;
    constructor(app: INestApplication) {
        this.app = app;
    }

    async connect() {
        this.app.connectMicroservice(
            {
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: [
                            `${kafkaConfig.host}:${kafkaConfig.port}`,
                        ],
                    },
                    consumer: {
                        groupId: kafkaConfig.groupId,
                    },
                },
            },
        );
        console.log("Kafka is running on ", `${kafkaConfig.host}:${kafkaConfig.port}`);
    }
}