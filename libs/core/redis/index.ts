import { INestApplication } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { config as redisConfig } from '@root/libs/core/redis/config';

export class RedisMicroservice {
    private readonly app: INestApplication;
    constructor(app: INestApplication) {
        this.app = app;
    }

    async connect() {
        this.app.connectMicroservice(
            {
                transport: Transport.REDIS,
                options: {
                    host: redisConfig.host,
                    port: redisConfig.port,
                },
            },
        );
        console.log("Redis is running on ", `${redisConfig.host}:${redisConfig.port}`);
    }
}