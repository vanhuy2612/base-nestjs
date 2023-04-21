import { EventPattern } from '@nestjs/microservices';
import { BaseConsumer } from '../base/base.consumer';
import { TOPIC } from '../common';

export class AuthConsumer extends BaseConsumer {
    @EventPattern(TOPIC.USER_LOGIN)
    async handle(value: any) {
        console.log(`Data from consumer ${TOPIC.USER_LOGIN} `, value);
    }
}
