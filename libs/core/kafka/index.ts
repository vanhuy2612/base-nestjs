import { INestApplication } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { config } from '@root/libs/core/kafka/config';

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
                    host: config.host,
                    port: config.port,
                },
            },
        );
        console.log("Kafka is running on ", `${config.host}:${config.port}`);
    }
}