import { Injectable } from '@nestjs/common';
import { BaseQueue } from './base';

@Injectable()
export class MailQueue extends BaseQueue{
    name: string = 'MAIL_QUEUE';
    async handle() {
        console.log(this.name);
    };
}