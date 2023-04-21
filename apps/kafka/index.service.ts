import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { config } from "./config";
import { TOPIC } from "./common";

@Injectable()
export class KafkaMicroservice implements OnModuleInit {
    constructor(
        @Inject(config.injectionToken) readonly client: ClientKafka,
    ) { }

    async onModuleInit() {
        for (let key in TOPIC) {
            this.client.subscribeToResponseOf(TOPIC[key]);
        }
        await this.client.connect();
        console.log('************ Kafka is running ******************');
    }
}