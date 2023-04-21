import { INestApplication } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { config as redisConfig } from '@root/libs/core/redis/config';

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
                    host: redisConfig.host,
                    port: redisConfig.port,
                },
            },
        );
        console.log("Kafka is running on ", `${redisConfig.host}:${redisConfig.port}`);
    }
}